#!/usr/bin/env sh

for f in *.png; do
	convert "$f" "${f%.png}.webp"
done
