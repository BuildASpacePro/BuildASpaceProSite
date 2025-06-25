---
layout: page
title: Products
permalink: /products/
---

# Software for humans #
## Satellite Mission Planner

Satellite Mission Planner enables operators, system architects and even customers perform coarse mission planning for individual satellites or clusters of satellites. 

![SpaceX Starlink satellites deploying in LEO](/assets/images/satellitedeploy.jpg)

<div style="text-align: center;"><em>Image credit: SpaceX</em></div>



# Software for AI #
## MCP-Orbit

This Model Context Protocol (MCP) server helps Large Language Models (LLMs) run orbit propagation models on satellites, giving them the correct maths needed to calculate access windows for satellites, ground stations and other targets.

There are certain specific tasks that LLMs are just not qualified to do (as of 2025) so some specialised activities are better coded by humans, verified and then provided to LLMs with the correct interface so they can carry out the same calculations. 

Based on the [python Skyfield module](https://rhodesmill.org/skyfield/), it enables access windows to be calculated between satellites, ground stations and other targets. Or simply for positions to be calculated. A visualiser was also added using Cesium, so the user can view when interactions take place.