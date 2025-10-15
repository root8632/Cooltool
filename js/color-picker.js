document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('color-input');
    const hexInput = document.getElementById('hex-input');
    const rgbInput = document.getElementById('rgb-input');
    const hslInput = document.getElementById('hsl-input');
    const colorPreview = document.getElementById('color-preview');

    function updateColors(source, value) {
        let hex, rgb, hsl;

        switch (source) {
            case 'picker':
            case 'hex':
                hex = value.startsWith('#') ? value : `#${value}`;
                rgb = hexToRgb(hex);
                if (rgb) hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                break;
            case 'rgb':
                const rgbMatch = value.match(/(\d+),\s*(\d+),\s*(\d+)/);
                if (rgbMatch) {
                    const [_, r, g, b] = rgbMatch.map(Number);
                    rgb = { r, g, b };
                    hex = rgbToHex(r, g, b);
                    hsl = rgbToHsl(r, g, b);
                }
                break;
            case 'hsl':
                 const hslMatch = value.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/);
                if (hslMatch) {
                    const [_, h, s, l] = hslMatch.map(Number);
                    hsl = { h, s, l };
                    rgb = hslToRgb(h, s, l);
                    if (rgb) hex = rgbToHex(rgb.r, rgb.g, rgb.b);
                }
                break;
        }

        if (hex && rgb && hsl) {
            if (source !== 'picker') colorPicker.value = hex;
            if (source !== 'hex') hexInput.value = hex;
            if (source !== 'rgb') rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            if (source !== 'hsl') hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            colorPreview.style.backgroundColor = hex;
        }
    }

    colorPicker.addEventListener('input', (e) => updateColors('picker', e.target.value));
    hexInput.addEventListener('input', (e) => updateColors('hex', e.target.value));
    rgbInput.addEventListener('input', (e) => updateColors('rgb', e.target.value));
    hslInput.addEventListener('input', (e) => updateColors('hsl', e.target.value));

    // Color conversion functions
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    }

    function hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }


    // Initial load
    updateColors('picker', colorPicker.value);
});