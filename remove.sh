#!/bin/bash
docker stop smart-home-broker
docker rm smart-home-broker
docker image rm smart-home-broker:latest