---
layout: post
title: "7. Performance"
date: 2025-05-12 12:00:00 +0000
categories: Linux, Performance, Rust, Efficiency
---

# Performance
Performance engineering is a topic that will forever remain important. We currently live in the information age and are entering the AI age - software is an asset that is low-cost, easy to change (cheaper than bending metal) and effortless to scale/deploy globally. This carries serious implications for the modern world.

## Example: JPEG & MP3 compression
Compression algorithms for JPEG (images) and MP3 (audio) reduce file sizes by orders of magnitude, slashing storage and transmission costs. For instance, streaming an MP3 at 128kbps versus uncompressed WAV at 1.4Mbps saves ~90% of banddiwth, reducing energy use in data centers and networks. 

## Example: Internet browsing
If every major website optimised it's codebase to save 10KB per page load (assuming 2 trillion page views annually), data savings could reach 20 petabytes - cutting energy use by 200-1000GWh (assuming 0.01-0.05kWh/GB). That's approximately enough to power a small city for a year!

It's evident that these small changes in how we design and use software can carry big consequences. 

## Personal opinion
So much of the software we use today is bloated - containing too many features or too many distractions. The [2023 word of the year](https://en.wikipedia.org/wiki/Enshittification) captures well the framework behind which many software products decline in quality over the time. 

The Apollo 11 guidance computer had just 2048 words of RAM (16-bit) and had less computing power than any modern calculator and yet was able to take humans to the Moon and back. Simple and functional, this is an example of using dire amounts of memory to achieve a goal - something I think few engineers could do today (myself included)

## iPhone Storage

![My iPhone storage](/assets/images/iPhoneStorage.jpg)

<div style="text-align: center;"><em>Image credit: Authors</em></div>

You can see even on my iPhone how much storage is taken up by apps that perform functions as simple as accessing the internet. Barebone apps typically only need UI elements, libraries, frameworks, fonts and network files to function - but today's apps have bloated far beyond the simple functions a user desires. Analytic SDKs, media processing libraries, cached content and database files now plague these smart devices, performing functions beyond what many normal users might want.

# Example: Prime numbers in Rust
For this I'm going to use the [Criterion crate in Rust](https://docs.rs/criterion2/latest/criterion/) which can be added to your project toml using the following command:

`cargo add criterion`

As an example, I've got code that will calculate every prime number between 1 to 10,000. One algorithm discovers primes using division (brute force) whereas the other - [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) disregards numbers by knowing their factors (i.e. since 2 is a prime, every multiple of 2 cannot be). 

I'll provide [a link to the repo I've created called PRIME BENCHMARK](https://github.com/BuildASpacePro/PRIME_BENCHMARK) but will also paste elements of the code below.

## Setting Up the Benchmark

```rust
pub fn prime_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Prime Number Algorithms");
    
    // Test with different input sizes
    for size in [100, 1000, 5000, 10000].iter() {
        group.bench_with_input(BenchmarkId::new("Sieve of Eratosthenes", size), size, |b, &size| {
            b.iter(|| sieve_of_eratosthenes(black_box(size)));
        });
        
        group.bench_with_input(BenchmarkId::new("Trial Division", size), size, |b, &size| {
            b.iter(|| trial_division(black_box(size)));
        });
    }
    
    group.finish();
}
```

Criterion makes it easy to:
- Group related benchmarks with `benchmark_group`
- Test multiple input sizes to observe algorithm scaling
- Use `bench_with_input` to parameterize benchmarks
- Use `black_box` to prevent compiler optimization

## Memory Usage Benchmarking

```rust
pub fn memory_benchmark(c: &mut Criterion) {
    let mut group = c.benchmark_group("Memory Usage Comparison");
    
    // Create a CSV file to store memory metrics
    let mut memory_csv = File::create("memory_metrics.csv").unwrap();
    writeln!(memory_csv, "algorithm,size,peak_rss_kb,current_rss_kb,virtual_mem_bytes,virtual_mem_bytes,execution_time_ns").unwrap();
    
    for size in [5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000].iter() {
        // Warm-up run
        let _ = sieve_of_eratosthenes_monitored(*size);
        
        // Now do the actual measurement
        group.bench_function(BenchmarkId::new("Sieve Memory", size), |b| {
            b.iter_with_setup(
                || {},
                |_| {
                    let (_, metrics) = sieve_of_eratosthenes_monitored(black_box(*size));
                    
                    // Log metrics to CSV
                    writeln!(
                        memory_csv, 
                        "sieve,{},{},{},{},{},{}",
                        size,
                        metrics.peak_rss_kb,
                        metrics.current_rss_kb,
                        metrics.virtual_mem_bytes,
                        metrics.virtual_mem_bytes,
                        metrics.execution_time.as_nanos()
                    ).unwrap();
                    
                    metrics
                }
            )
        });
    }
}
```
## Algorithmic Differences

The Sieve of Eratosthenes creates a boolean array of size n+1, meaning its memory usage scales linearly with input size. Trial division builds a vector of primes that grows more slowly (approximately n/ln(n) elements), but performs many more comparisons.

Criterion helps quantify these tradeoffs precisely, allowing developers to make informed decisions based on specific constraints.

![Comparison of algorithm efficiency](/assets/images/algograph.png)

<div style="text-align: center;"><em>Comparison of algorithm efficency</em></div>

As shown in the graph above, for more prime numbers that are searched for, the time taken will increase for both algorithms - but since the Sieve of Eratosthenes (an algorithm over 2000 years old!) is more efficient, it takes much less time. 

## Conclusion
Performance engineering isn't just about making hardware and software run faster, it's about creating more efficient technology for the world to use. At scale, deployment of these technologies will have profound effects on society, the economy and the way people live their lives. One can only hope that the future is free from the bloatware that seems to forever plague the world. 