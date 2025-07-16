---
layout: page
title: Products
permalink: /products/
hide_title: true
---

<div style="font-size: 64px; font-weight: 300; margin: 2rem 0; text-align: center;">Software for humans</div>

## Mission Planner

Mission Planner enables satellite operators, system architects and customers to perform coarse mission planning for individual satellites or clusters of satellites. 

This top-down Mission Planner lets users task and monitor overarching events (e.g. take images over Europe, plan maintenance period over the Pacific, downlink to Svalbard, etc) while specific low-level events (e.g. power on payload sensor, prepare to run script #17, slew 29° in 5 minutes, etc) are handled by the satellites themselves.

[Download for free](https://github.com/BuildASpacePro/OpenPlan)

![SpaceX Starlink satellites deploying in LEO](/assets/images/satellitedeploy.jpg)

<div style="text-align: center;"><em>Image credit: SpaceX</em></div>



<div style="font-size: 64px; font-weight: 300; margin: 2rem 0; text-align: center;">Software for Machines</div>

## MCP-Orbit

This Model Context Protocol (MCP) server helps Large Language Models (LLMs) run orbit propagation models on satellites, calculate access windows to ground stations and other satellites. It also implements code for Rendezvous & Proximity Operations (RPO) making it versatile how the LLM uses the backend maths.

There are certain specific tasks that LLMs are just not qualified to do (as of 2025) so some specialised activities are better coded by humans, verified and then provided to LLMs with the correct interface so they can carry out the same calculations. 

Based on the [python Skyfield module](https://rhodesmill.org/skyfield/), it enables access windows to be calculated between satellites, ground stations and other targets. Or simply for positions to be calculated. A visualiser was also added using Cesium, so the user can view when interactions take place.

[Download for free](https://github.com/BuildASpacePro/Orbit-MCP)