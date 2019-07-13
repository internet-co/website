"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lodash_1 = require("lodash");
class WaveformLine {
    constructor(yOffset) {
        this.yOffset = 0;
        this.yOffset = yOffset;
    }
    /*static map(n, a, b, _a, _b) {
        var d = b - a;
        var _d = _b - _a;
        var u = _d / d;
        return _a + (n - a) * u;
    }

    static PERLIN_YWRAPB = 4;
    static PERLIN_YWRAP = 1<<WaveformLine.PERLIN_YWRAPB;
    static PERLIN_ZWRAPB = 8;
    static PERLIN_ZWRAP = 1<<WaveformLine.PERLIN_ZWRAPB;
    static PERLIN_SIZE = 4095;

    static scaled_cosine(i) {
        return 0.5*(1.0-Math.cos(i*Math.PI));
    };

    static perlin_octaves = 4; // default to medium smooth
    static perlin_amp_falloff = 0.5; // 50% reduction/octave
    static perlin;

    static noiseDetail(lod, falloff) {
        // Adjusts the character and level of detail produced by the Perlin noise
        // By default, noise is computed over 4 octaves
        // https://p5js.org/reference/#/p5/noiseDetail
        if (lod>0)     { WaveformLine.perlin_octaves=lod; }
        if (falloff>0) { WaveformLine.perlin_amp_falloff=falloff; }
    }

    static noise(x,y,z) {
        y = y || 0;
        z = z || 0;

        if (WaveformLine.perlin == null) {
            WaveformLine.perlin = new Array(WaveformLine.PERLIN_SIZE + 1);
            for (var i = 0; i < WaveformLine.PERLIN_SIZE + 1; i++) {
                WaveformLine.perlin[i] = Math.random();
            }
        }

        if (x<0) { x=-x; }
        if (y<0) { y=-y; }
        if (z<0) { z=-z; }

        var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
        var xf = x - xi;
        var yf = y - yi;
        var zf = z - zi;
        var rxf, ryf;

        var r=0;
        var ampl=0.5;

        var n1,n2,n3;

        for (var o=0; o<WaveformLine.perlin_octaves; o++) {
            var of=xi+(yi<<WaveformLine.PERLIN_YWRAPB)+(zi<<WaveformLine.PERLIN_ZWRAPB);

            rxf = WaveformLine.scaled_cosine(xf);
            ryf = WaveformLine.scaled_cosine(yf);

            n1  = WaveformLine.perlin[of&WaveformLine.PERLIN_SIZE];
            n1 += rxf*(WaveformLine.perlin[(of+1)&WaveformLine.PERLIN_SIZE]-n1);
            n2  = WaveformLine.perlin[(of+WaveformLine.PERLIN_YWRAP)&WaveformLine.PERLIN_SIZE];
            n2 += rxf*(WaveformLine.perlin[(of+WaveformLine.PERLIN_YWRAP+1)&WaveformLine.PERLIN_SIZE]-n2);
            n1 += ryf*(n2-n1);

            of += WaveformLine.PERLIN_ZWRAP;
            n2  = WaveformLine.perlin[of&WaveformLine.PERLIN_SIZE];
            n2 += rxf*(WaveformLine.perlin[(of+1)&WaveformLine.PERLIN_SIZE]-n2);
            n3  = WaveformLine.perlin[(of+WaveformLine.PERLIN_YWRAP)&WaveformLine.PERLIN_SIZE];
            n3 += rxf*(WaveformLine.perlin[(of+WaveformLine.PERLIN_YWRAP+1)&WaveformLine.PERLIN_SIZE]-n3);
            n2 += ryf*(n3-n2);

            n1 += WaveformLine.scaled_cosine(zf)*(n2-n1);

            r += n1*ampl;
            ampl *= WaveformLine.perlin_amp_falloff;
            xi<<=1;
            xf*=2;
            yi<<=1;
            yf*=2;
            zi<<=1;
            zf*=2;

            if (xf>=1.0) { xi++; xf--; }
            if (yf>=1.0) { yi++; yf--; }
            if (zf>=1.0) { zi++; zf--; }
        }
        return r;
    }*/
    draw(ctx, noiseAmplitude, cw, ch) {
        ctx.beginPath();
        ctx.moveTo(-2, this.yOffset);
        for (let x = -2; x < cw + WaveformLine.HORIZ_RESOLUTION; x += WaveformLine.HORIZ_RESOLUTION) {
            ctx.lineTo(x, this.yOffset + lodash_1.random(-noiseAmplitude, noiseAmplitude, true));
        }
        ctx.lineTo(cw + 2, ch + 2);
        ctx.lineTo(-2, ch + 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}
WaveformLine.HORIZ_RESOLUTION = 5;
class Waveform extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasElement = React.createRef();
    }
    componentDidMount() {
        //this.drawWaveform();
    }
    /*drawWaveform()
    {
        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                    || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                // @ts-ignore
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());

        var PERLIN_YWRAPB = 4;
        var PERLIN_YWRAP = 1<<PERLIN_YWRAPB;
        var PERLIN_ZWRAPB = 8;
        var PERLIN_ZWRAP = 1<<PERLIN_ZWRAPB;
        var PERLIN_SIZE = 4095;

        var perlin_octaves = 4; // default to medium smooth
        var perlin_amp_falloff = 0.5; // 50% reduction/octave

        var scaled_cosine = function(i) {
            return 0.5*(1.0-Math.cos(i*Math.PI));


        };

        var perlin; // will be initialized lazily by noise() or noiseSeed()



        function noise(x,y,z) {
            y = y || 0;
            z = z || 0;

            if (perlin == null) {
                perlin = new Array(PERLIN_SIZE + 1);
                for (var i = 0; i < PERLIN_SIZE + 1; i++) {
                    perlin[i] = Math.random();
                }
            }

            if (x<0) { x=-x; }
            if (y<0) { y=-y; }
            if (z<0) { z=-z; }

            var xi=Math.floor(x), yi=Math.floor(y), zi=Math.floor(z);
            var xf = x - xi;
            var yf = y - yi;
            var zf = z - zi;
            var rxf, ryf;

            var r=0;
            var ampl=0.5;

            var n1,n2,n3;

            for (var o=0; o<perlin_octaves; o++) {
                var of=xi+(yi<<PERLIN_YWRAPB)+(zi<<PERLIN_ZWRAPB);

                rxf = scaled_cosine(xf);
                ryf = scaled_cosine(yf);

                n1  = perlin[of&PERLIN_SIZE];
                n1 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n1);
                n2  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
                n2 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n2);
                n1 += ryf*(n2-n1);

                of += PERLIN_ZWRAP;
                n2  = perlin[of&PERLIN_SIZE];
                n2 += rxf*(perlin[(of+1)&PERLIN_SIZE]-n2);
                n3  = perlin[(of+PERLIN_YWRAP)&PERLIN_SIZE];
                n3 += rxf*(perlin[(of+PERLIN_YWRAP+1)&PERLIN_SIZE]-n3);
                n2 += ryf*(n3-n2);

                n1 += scaled_cosine(zf)*(n2-n1);

                r += n1*ampl;
                ampl *= perlin_amp_falloff;
                xi<<=1;
                xf*=2;
                yi<<=1;
                yf*=2;
                zi<<=1;
                zf*=2;

                if (xf>=1.0) { xi++; xf--; }
                if (yf>=1.0) { yi++; yf--; }
                if (zf>=1.0) { zi++; zf--; }
            }
            return r;
        };

        function noiseDetail(lod, falloff) {
            // Adjusts the character and level of detail produced by the Perlin noise
            // By default, noise is computed over 4 octaves
            // https://p5js.org/reference/#/p5/noiseDetail
            if (lod>0)     { perlin_octaves=lod; }
            if (falloff>0) { perlin_amp_falloff=falloff; }
        };


        function noiseSeed(seed) {
            // Linear Congruential Generator
            // Variant of a Lehman Generator
            var lcg = (function() {
                // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
                // m is basically chosen to be large (as it is the max period)
                // and for its relationships to a and c
                var m = 4294967296,
                    // a - 1 should be divisible by m's prime factors
                    a = 1664525,
                    // c and m should be co-prime
                    c = 1013904223,
                    seed, z;
                return {
                    setSeed : function(val) {
                        // pick a random seed if val is undefined or null
                        // the >>> 0 casts the seed to an unsigned 32-bit integer
                        z = seed = (val == null ? Math.random() * m : val) >>> 0;
                    },
                    getSeed : function() {
                        return seed;
                    },
                    rand : function() {
                        // define the recurrence relationship
                        z = (a * z + c) % m;
                        // return a float in [0, 1)
                        // if z = m then z / m = 0 therefore (z % m) / m < 1 always
                        return z / m;
                    }
                };
            }());

            lcg.setSeed(seed);
            perlin = new Array(PERLIN_SIZE + 1);
            for (var i = 0; i < PERLIN_SIZE + 1; i++) {
                perlin[i] = lcg.rand();
            }
        };

        let canvas = this.canvasElement.current;

        var ctx = canvas.getContext("2d");
        var c = {}
        var cw = canvas.width = 450;
        c.x = cw / 2;
        var ch = canvas.height = window.outerHeight;
        c.y = ch / 2;
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#CCC";
        ctx.fillStyle = "#FFFFFF";
        var rad = Math.PI / 180;
        var x, y;

        var amplitude = 5;
        var frequency = .02;
        var phi = 0;

        var increment = 0.05;
        var lines = [];

        function SquigglyLine(y) {
            this.y = y;
            this.xoff = Math.random() * 10000;
            this.Xoff = this.xoff;
            this.phi = Math.random() * 10000;
            this.draw = function(i) {
                ctx.beginPath();

                this.xoff = this.Xoff; // reset xoff;

                for (var x = -2; x < cw + 2; x++) {

                    if (x > cw / 3 && x < 2 * cw / 3) {
                        var k = map(x, cw / 3, 2 * cw / 3, 0, 180);
                    } else {
                        k = 0;
                    }

                    var y = -Math.abs(Math.sin((x + noise(this.xoff) * 100) * frequency + this.phi) * (amplitude + Math.sin(k * rad) * 50)) + this.y;

                    ctx.lineTo(x, y);

                    this.xoff += increment;

                }
                ctx.lineTo(cw + 2, ch + 2);
                ctx.lineTo(-2, ch + 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

            }
        }

        for (var y = 60; y < ch; y += 16) {

            var line = new SquigglyLine(y);
            lines.push(line);

        }

        function Draw() {
            requestId = window.requestAnimationFrame(Draw);
            ctx.fillRect(0, 0, cw, ch);

            noiseDetail(2, .5);

            for (var i = 0; i < lines.length; i++) {
                lines[i].phi += 1 / 30;
                lines[i].draw(i);
            }

        }

        let requestId = window.requestAnimationFrame(Draw);

        function map(n, a, b, _a, _b) {
            var d = b - a;
            var _d = _b - _a;
            var u = _d / d;
            return _a + (n - a) * u;
        }
    }*/
    render() {
        return React.createElement("canvas", { ref: this.canvasElement, className: "waveform" });
    }
}
exports.Waveform = Waveform;
//# sourceMappingURL=Waveform.js.map