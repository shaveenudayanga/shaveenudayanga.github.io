---
title: "Building Lumina: what a robotic desk lamp taught me"
date: "2026-02-15"
updated: "2026-02-15"
description: "The engineering decisions behind Lumina: the ESP32 board and firmware, real-time gesture tracking with MediaPipe, and voice conversation with Gemini 2.5."
author: "Shaveen Udayanga"
tags: ["IoT", "AI", "HCI", "ESP32"]
image: "/images/projects/lumina/lamp.webp"
imageAlt: "Lumina, a small robotic desk lamp with an OLED face display"
faq:
  - question: "What is Lumina?"
    answer: "Lumina is a robotic desk lamp that uses an ESP32 microcontroller, two servo motors for pan/tilt movement, MediaPipe for real-time hand tracking, and Google Gemini 2.5 for short voice conversations, plus a small OLED face."
  - question: "What hardware does Lumina use?"
    answer: "Lumina runs on an ESP32 microcontroller with a custom PCB designed in KiCad, two servo motors for movement, and an OLED display. It communicates with a Python host over WiFi using UDP for sub-10ms latency."
  - question: "How does Lumina track hand gestures in real-time?"
    answer: "Lumina uses Google's MediaPipe hand tracking running at 30fps on a Python host application. The position data is sent over UDP to the ESP32, which smooths the positions before updating the servos at 50Hz."
---

## Why Build a Robotic Lamp?

For my Human-Computer Interaction module, I wanted to build something you could interact with without a screen. Not another chatbot, but an object on your desk that turns to follow you and can talk back.

Lumina started as a sketch on a whiteboard. It ended up as a working lamp with hand tracking (MediaPipe), short voice conversations (Gemini 2.5) and a small OLED face.

## The Hardware Stack

Lumina runs on an ESP32 with firmware I wrote. I designed the board in KiCad and hand-soldered every component. Two servos handle pan and tilt, which turned out to be enough movement to give it some personality.

The hardest part was smooth movement. Servos jitter if you feed them raw position data, so the ESP32 applies exponential smoothing before each update. After that, the lamp follows your hand without twitching.

## Software Architecture

The software runs across three layers:

1. **ESP32 firmware** (C++): Handles servo control, OLED display animations, and UDP packet reception
2. **Python host application**: Runs MediaPipe hand tracking, Gemini voice conversation, and sends control packets to the ESP32
3. **UDP bridge**: a small protocol between the host and the ESP32, fast enough that the lag is not noticeable

I chose UDP over serial because it decouples the host from the hardware. The lamp connects over WiFi, which means the host application can run on any machine on the network.

## Lessons Learned

1. **Hardware is unforgiving.** A software bug costs you a restart. A soldering mistake costs you hours with a desoldering wick.
2. **Real-time systems need real constraints.** MediaPipe runs at 30fps, but servo updates at 50Hz feel best. Managing these different timing requirements taught me more about scheduling than any lecture did.
3. **The HCI insight:** People anthropomorphize things that move. The moment Lumina tracked someone's hand for the first time, they started talking to it. Before we even added voice.

## What's Next

I want to add persistent memory so Lumina remembers who it has talked to. The current conversation resets each session. I would also like to try a depth sensor, so it knows how far away your hand is, not just where.
