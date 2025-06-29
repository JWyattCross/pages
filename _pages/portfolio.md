---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true

gallery1:
  - image_path: /files/cfd.gif
    url: /files/cfd.gif
    title: CFD Simulation
    alt: Animated CFD visualization of underwater vehicle

  - image_path: /files/cfd_static.png
    url: /files/cfd_static.png
    title: UUV Design
    alt: Static image of vehicle geometry

  - image_path: /files/cfd_plots.png
    url: /files/cfd_plots.png
    title: Coefficient Plots
    alt: Plot showing CFD-extracted coefficients

---

Welcome to my portfolio showcasing selected projects and demonstrations.  
For a more comprehensive overview of my work, including detailed reports and documentation, please see my [full PDF portfolio](/files/Cross_James_Engineering_Portfolio2024.pdf).

## Professional Experience

### Naval Surface Warfare Center, Panama City Division  
*Engineering Intern* — Panama City, FL | May 2024 – July 2024

- Demonstrated CFD-based hydrodynamic coefficient determination for state estimation of a UUV  
- Determined 39 of 43 total vehicle coefficients with the design of 18 different CFD simulations  
- Developed Python calculators to find coefficients from simulation and experimental data using a pseudoinverse to approximate a least squares solution  
- Documented simulations for future replication in OpenFOAM as the UUV configuration changes  

{% include gallery.html caption="Hydrodynamic coefficient estimation using CFD simulations." %}

<!-- <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
  <img src="/files/cfd.gif" alt="CFD Simulation" style="max-width: 30%; border-radius: 8px;">
  <img src="/files/cfd_static.png" alt="UUV Design" style="max-width: 30%; border-radius: 8px;">
  <img src="/files/cfd_plots.png" alt="Coefficient Determination Design" style="max-width: 30%; border-radius: 8px;">
</div> -->

---

### UF Nonlinear Controls and Robotics Group  
*Undergraduate Researcher* — Gainesville, FL | Sep 2022 – Present

- Implemented Lyapunov-based nonlinear herding algorithms utilizing deep neural networks while supporting 14 PhD candidates in their research and demonstrations  
- Designed and manufactured 40+ parts to integrate sensor payloads onto robots  
- Wrote ROS 2 Python packages to share and compare vehicle position between 8+ robots, allowing agents to be “neutralized” to facilitate herding/swarming experiments  
- Built and deployed a remote emergency stop system using C++ and Arduino for 30+ robots  

<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
  <img src="/images/robot_parts.jpg" alt="Robot Parts" style="max-width: 48%; border-radius: 8px;">
  <img src="/images/robotics_experiment.jpg" alt="Robotics Experiment" style="max-width: 48%; border-radius: 8px;">
</div>



<!-- 
## Selected Projects

---

### 🦾 Autonomous Rover Navigation Demo

**Spring 2024 – University of Florida**

This project showcases a 4WD rover navigating a simulated Martian terrain using LiDAR and SLAM.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen
    style="position: absolute; top:0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

*Implemented using ROS2 and RViz. Mapping accuracy improved over 10 trials.*
 -->
