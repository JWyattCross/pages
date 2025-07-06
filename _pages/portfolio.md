---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true

gallery1:
  - image_path: /images/cfd.gif
    url: /images/cfd.gif
    title: CFD Simulation
    alt: Animated CFD visualization of underwater vehicle

  - image_path: /images/cfd_static.png
    url: /images/cfd_static.png
    title: UUV Design
    alt: Static image of vehicle geometry

  - image_path: /images/cfd_plots.png
    url: /images/cfd_plots.png
    title: Coefficient Plots
    alt: Plot showing CFD-extracted coefficients

gallery2:
  - image_path: /images/herding_simulation.gif
    url: /images/herding_simulation.gif
    title: Herding Simulation

  - image_path: /images/dogs.jpg
    url: /images/dogs.jpg
    title: Quadruped Robots

  - image_path: /images/rviz_sim.png
    url: /images/rviz_sim.png
    title: RVIZ Environment

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

{% include gallery id="gallery1"%}

---

### UF Nonlinear Controls and Robotics Group  
*Undergraduate Researcher* — Gainesville, FL | Sep 2022 – Present

- Implemented Lyapunov-based nonlinear herding algorithms utilizing deep neural networks while supporting 14 PhD candidates in their research and demonstrations  
- Designed and manufactured 40+ parts to integrate sensor payloads onto robots  
- Wrote ROS 2 Python packages to share and compare vehicle position between 8+ robots, allowing agents to be “neutralized” to facilitate herding/swarming experiments  
- Built and deployed a remote emergency stop system using C++ and Arduino for 30+ robots  

{% include gallery id="gallery2"%}
