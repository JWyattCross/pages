---
layout: archive
title: "Portfolio"
permalink: /portfolio/
author_profile: true
---

Welcome to my portfolio showcasing selected projects and demonstrations.  
For a more comprehensive overview of my work, including detailed reports and documentation, please see my [full PDF portfolio](/files/Cross_James_Engineering_Portfolio2024.pdf).

## Professional Experience

### Naval Surface Warfare Center, Panama City Division  
*Undergraduate Researcher* — Gainesville, FL | Sep 2022 – Present

- Demonstrated CFD-based hydrodynamic coefficient determination for state estimation of a UUV  
- Determined 39 of 43 total vehicle coefficients with the design of 18 different CFD simulations  
- Developed Python calculators to find coefficients from simulation and experimental data using a pseudoinverse to approximate a least squares solution  
- Documented simulations for future replication in OpenFOAM as the UUV configuration changes  

<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
  <img src="/files/cfd.gif" alt="CFD Simulation" style="max-width: 48%; border-radius: 8px;">
  <img src="/files/cfd_static.png" alt="UUV Design" style="max-width: 48%; border-radius: 8px;">
  <img src="/files/cfd_plots.png" alt="Coefficient Determination Design" style="max-width: 48%; border-radius: 8px;">
</div>

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

---

### 🎮 Interactive Robot Arm Interface

**Summer 2023 – Python + PyGame + ROS**

Created a graphical interface to control a 6-DOF robotic arm with real-time inverse kinematics feedback.

![Robot Arm UI](/images/robot_arm_ui.png)

*Interface allows point-and-click motion planning and trajectory visualization.*

---

### 📡 High-Gain Antenna Tracker

**Fall 2022 – Custom PCB + PID Controller**

Designed and fabricated a dual-axis antenna tracker for weather balloon telemetry.

![Antenna Tracker](/images/antenna_tracker.png)

![PCB Closeup](/images/antenna_tracker_pcb.jpg)

*Used STM32 microcontroller and Kalman filtering for accurate sun tracking.*

---

## Add Your Own Projects

To add more entries:

1. Start with a `### Project Title`
2. Add a **text paragraph**
3. Include an **embedded video** or image:
   - YouTube: use the `<iframe>` snippet above
   - Images: `![Alt Text](/images/your_image.png)`

---

Let me know if you want:
- Grid layout instead of stacked
- Lightbox-style image popups
- Filter by category (e.g. "robotics", "software")
