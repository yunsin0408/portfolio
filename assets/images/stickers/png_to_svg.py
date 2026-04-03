#!/usr/bin/env python3
"""
PNG → SVG vectorizer using vtracer.
Install deps: pip install vtracer Pillow

Usage:
  python png_to_svg.py sticker.png          # outputs sticker.svg
  python png_to_svg.py sticker.png out.svg  # custom output name
"""

import sys
import subprocess

def install_if_missing(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

install_if_missing("vtracer")
install_if_missing("PIL")  # Pillow

import vtracer
from PIL import Image
from pathlib import Path

def convert(input_path: str, output_path: str = None):
    src = Path(input_path)
    if not src.exists():
        print(f"❌ File not found: {input_path}")
        sys.exit(1)

    dst = Path(output_path) if output_path else src.with_suffix(".svg")

    # Ensure it's a proper RGBA PNG (transparency preserved)
    img = Image.open(src).convert("RGBA")
    tmp = src.with_name(src.stem + "_tmp.png")
    img.save(tmp)

    print(f"🔄 Tracing {src.name} → {dst.name} ...")

    vtracer.convert_image_to_svg_py(
        str(tmp),
        str(dst),
        colormode="color",       # 'color' | 'binary' (black & white only)
        hierarchical="stacked",  # 'stacked' | 'cutout'
        mode="spline",           # 'spline' | 'polygon' | 'none'
        filter_speckle=4,        # ignore noise smaller than N px
        color_precision=6,       # color quantization (1-8, higher = more colors)
        layer_difference=16,     # merges similar color layers
        corner_threshold=60,     # sharpness of corners (degrees)
        length_threshold=4.0,    # min path segment length
        max_iterations=10,       # curve fitting iterations
        splice_threshold=45,     # curve splice angle
        path_precision=3,        # decimal places in SVG path data
    )

    tmp.unlink()  # clean up temp file
    print(f"✅ Saved to: {dst}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python png_to_svg.py <input.png> [output.svg]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    convert(input_file, output_file)
