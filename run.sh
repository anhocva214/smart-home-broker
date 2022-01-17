#!/bin/bash
docker stop smart-home-broker
docker rm smart-home-broker
docker image rm smart-home-broker:latest
docker build -t smart-home-broker:latest -f Dockerfile .
docker run -d -p 3883:1883 -p 4884:3883 --name smart-home-broker smart-home-broker:latest
