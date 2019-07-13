// Context Free Art Javascript
const cfa = {
    canvas: null,
    stack: [],
    draws: [],
    // affine adjustments
    ajustments: {
        x(m, v) {
            m[4] += v * m[0];
            m[5] += v * m[1];
        },
        y(m, v) {
            m[4] += v * m[2];
            m[5] += v * m[3];
        },
        z(m, v) {
            m[11] += v;
        },
        rotate(m, v) {
            const rad = Math.PI * v / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            const r00 = cos * m[0] + sin * m[2];
            const r01 = cos * m[1] + sin * m[3];
            m[2] = cos * m[2] - sin * m[0];
            m[3] = cos * m[3] - sin * m[1];
            m[0] = r00;
            m[1] = r01;
        },
        flip(m, v) {
            const rad = Math.PI * v / 180;
            const x = Math.cos(rad);
            const y = Math.sin(rad);
            const n = 1 / (x * x + y * y);
            const b00 = (x * x - y * y) / n;
            const b01 = 2 * x * y / n;
            const b10 = 2 * x * y / n;
            const b11 = (y * y - x * x) / n;
            const r00 = b00 * m[0] + b01 * m[2];
            const r01 = b00 * m[1] + b01 * m[3];
            m[2] = b10 * m[0] + b11 * m[2];
            m[3] = b10 * m[1] + b11 * m[3];
            m[0] = r00;
            m[1] = r01;
        },
        skew(m, v) {
            const x = Math.tan(Math.PI * v[0] / 180);
            const y = Math.tan(Math.PI * v[1] / 180);
            const r00 = m[0] + y * m[2];
            const r01 = m[1] + y * m[3];
            m[2] = x * m[0] + m[2];
            m[3] = x * m[1] + m[3];
            m[0] = r00;
            m[1] = r01;
        },
        scale(m, v) {
            let x, y;
            if (Array.isArray(v)) {
                x = v[0];
                y = v[1];
            } else {
                x = v;
                y = x;
            }
            m[0] *= x;
            m[1] *= x;
            m[2] *= y;
            m[3] *= y;
        },
        // colors adjust
        hue(m, v) {
            m[6] += v;
            m[6] %= 360;
        },
        sat(m, v) {
            this.adjustColor(m, v, 7);
        },
        bri(m, v) {
            this.adjustColor(m, v, 8);
        },
        alpha(m, v) {
            this.adjustColor(m, v, 9);
        },
        adjustColor(m, v, p) {
            if (v > 0) {
                m[p] += v * (1 - m[p]);
            } else {
                m[p] += v * m[p];
            }
        },
        raf(m, v) {
            m[10] = v ? 1 : 0;
        }
    },
    normal(s, e) {
        let rand = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6;
        return s + rand * (e - s);
    },
    random(s, e) {
        return s + Math.random() * (e - s);
    },
    adjust(s, p) {
        const m = [
            s[0],  // a00
            s[1],  // a10
            s[2],  // a01
            s[3],  // a11
            s[4],  // tx
            s[5],  // ty
            s[6],  // hue
            s[7],  // saturation
            s[8],  // brillance
            s[9],  // alpha
            s[10], // z-index
            s[11], // raf
            s[12]  // primitive
        ];
        for (const c in p) {
            this.ajustments[c](m, p[c]);
        }
        return m;
    },
    // primitives
    setTransform(s) {
        this.ctx.setTransform(
            -this.scale * s[0],
            this.scale * s[1],
            this.scale * s[2],
            -this.scale * s[3],
            this.scale * s[4] + this.offsetX,
            -this.scale * s[5] + this.offsetY
        );
    },
    CIRCLE(s, p = null) {
        this.primitive(s, p, 0);
    },
    SQUARE(s, p = null) {
        this.primitive(s, p, 1);
    },
    TRIANGLE(s, p = null) {
        this.primitive(s, p, 2);
    },
    primitive(s, p, i) {
        p && (s = this.adjust(s, p));
        s[12] = i;
        this.draws.push(s);
        this.bbox(s);
    },
    0(s) {
        // CIRCLE
        this.setTransform(s);
        this.fillStyle(s);
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 0.5, 0, 2 * Math.PI);
        this.ctx.fill();
    },
    1(s) {
        // SQUARE
        this.setTransform(s);
        this.fillStyle(s);
        this.ctx.fillRect(-0.5, -0.5, 1, 1);
    },
    2(s) {
        // TRIANGLE
        this.setTransform(s);
        this.fillStyle(s);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0.577350269);
        this.ctx.lineTo(-0.5, -0.28867513);
        this.ctx.lineTo(0.5, -0.28867513);
        this.ctx.lineTo(0.0, 0.577350269);
        this.ctx.closePath();
        this.ctx.fill();
    },
    fillStyle(s) {
        this.ctx.fillStyle = `hsla(${Math.round(s[6])},${Math.round(
            s[7] * 100
        )}%,${Math.round(s[8] * 100)}%,${s[9]})`;
    },
    bbox(s) {
        const x = s[4] * this.scale;
        const y = s[5] * this.scale;
        if (x < this.rect[0]) this.rect[0] = x;
        else if (x > this.rect[1]) this.rect[1] = x;
        if (y < this.rect[2]) this.rect[2] = y;
        else if (y > this.rect[3]) this.rect[3] = y;
    },
    center(s) {
        const br = this.rect;
        const scale =
            Math.min(this.width / (br[1] - br[0]), this.height / (br[3] - br[2])) * s;
        this.scale *= scale;
        this.offsetX = this.width * 0.5 - (br[0] + br[1]) * 0.5 * scale;
        this.offsetY = this.height * 0.5 + (br[3] + br[2]) * 0.5 * scale;
    },
    // rendering iterator
    *render() {
        let s = 0;
        for (const draw of this.draws) {
            this[draw[12]](draw);
            if (s++ > this.speed && draw[10]) {
                s = 0;
                this.speed *= this.acc;
                yield requestAnimationFrame(_ => this.iter.next());
            }
        }
        yield requestAnimationFrame(_ => this.iter.next());
    },
    // call shape
    rule(name, s, p) {
        s = this.adjust(s, p);
        const x = (s[0] * s[0] + s[1] * s[1]) * this.scale;
        const y = (s[2] * s[2] + s[3] * s[3]) * this.scale;
        if (x < this.minSize && y < this.minSize) {
            // too small
            return;
        }
        s[12] = this.shape[name] * 1;
        this.stack.push(s);
    },
    run(code, canvas) {

        this.canvas = canvas;

        // inject code
        this.shape = {};
        let k = 3;
        for (const rule in code) {
            this.shape[rule] = k;
            this[k++] = code[rule];
        }
        // reset canvas
        this.ctx = this.canvas.getContext("2d");
        this.width = this.canvas.width = this.canvas.offsetWidth * 2;
        this.height = this.canvas.height = this.canvas.offsetHeight * 2;
        if (code.setup.background) {
            this.ctx.fillStyle = code.setup.background;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
        // init setup
        this.rect = [0, 0, 0, 0];
        this.stack.length = 0;
        this.draws.length = 0;
        this.scale = 100;
        this.speed = code.setup.speed || 100;
        this.minSize = code.setup.minSize || 1.0;
        this.acc = code.setup.acc || 1.0;
        // push start shape
        this.rule(code.setup.start, [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0], false);
        // run rules
        const t1 = performance.now();
        let iter = 0;
        do {
            iter++;
            const s = this.stack.shift();
            this[s[12]](s);
        } while (this.stack.length);
        const t2 = performance.now();
        console.log(iter, t2 - t1);
        // zSorting
        if (code.setup.zSorting) {
            this.draws.sort(function(d0, d1) {
                return d0[11] - d1[11];
            });
        }
        // centering
        this.center(code.setup.zoom || 1.0);
        // start rendering loop
        this.iter && (this.iter.return());
        this.iter = this.render();
        this.iter.next();
    }
};

export {cfa};

/*["click", "touchdown"].forEach(event => {
    document.addEventListener(event, e => cfa.run(code), false);
});*/
/////////////////////////////////////////////
// Adapted from a CFDG code:
// https://www.contextfreeart.org/gallery2/index.html#design/357
// Love and Peace by strix, July 16th, 2006
/*const code = {
    setup: {
        background: "#fff",
        minSize: 0.2,
        zoom: 1,
        speed: 100,
        acc: 1.02,
        start: "INIT"
    },
    INIT(s) {
        this.rule('SUN', s, {rotate: -Math.random() * 180, bri: 0.2});
    },
    SUN(s) {
        this.rule('CILIA', s);
        this.rule('SUN', s, {x: 1.2, rotate: 7, scale: 0.97});
    },
    CILIA(s) {
        const r = Math.random() * 1601;
        let weight = 0;
        switch (true) {
            case r <= (weight += 1):
                this.CIRCLE(s);
                this.rule('SUN', s, {scale: 1});
                break;
            case r <= (weight += 1000):
                this.rule('O_BLOCK', s);
                this.rule('CILIA', s, {x: 1.2, scale: 0.97});
                break;
            case r <= (weight += 100):
                this.rule('PEACE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97});
                break;
            case r <= (weight += 100):
                this.rule('PEACE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97, rotate: -5});
                break;
            case r <= (weight += 100):
                this.rule('PEACE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97, rotate: 6});
                break;
            case r <= (weight += 100):
                this.rule('LOVE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97});
                break;
            case r <= (weight += 100):
                this.rule('LOVE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97, rotate: 6});
                break;
            case r <= (weight += 100):
                this.rule('LOVE', s, {rotate: 90});
                this.rule('CILIA', s, {x: 1.2, scale: 0.97, rotate: -6});
                break;
        }
    },
    LOVE(s) {
        this.rule('L_BLOCK', s, {x: 0});
        this.rule('O_BLOCK', s, {x: 1});
        this.rule('V_BLOCK', s, {x: 2});
        this.rule('E_BLOCK', s, {x: 3});
    },
    PEACE(s) {
        this.rule('E_BLOCK', s, {x: 0});
        this.rule('C_BLOCK', s, {x: -1});
        this.rule('A_BLOCK', s, {x: -2});
        this.rule('E_BLOCK', s, {x: -3});
        this.rule('P_BLOCK', s, {x: -4});
    },
    L_BLOCK(s) {
        this.SQUARE(s, {x: -0.28, scale: [0.25, 1]});
        this.SQUARE(s, {y: -0.4, scale: [0.8, 0.25]});
    },
    O_BLOCK(s) {
        this.CIRCLE(s, {scale: [0.95, 1]});
        this.CIRCLE(s, {scale: [0.46, 0.47], bri: 1});
    },
    V_BLOCK(s) {
        this.SQUARE(s, {x: -0.2, y: 0.2, scale:[0.25, 0.6], skew: [-45.5, 0]});
        this.SQUARE(s, {x: 0.2, y: 0.2, scale:[0.25, 0.6], skew: [45.5, 0]});
        this.TRIANGLE(s, {y: -0.2, rotate: 180, scale: [0.44, 0.5]});
    },
    E_BLOCK(s) {
        this.SQUARE(s, {x: -0.275, scale:[0.25, 1]});
        this.SQUARE(s, {y: 0.4, scale:[0.8, 0.2]});
        this.SQUARE(s, {y: -0.4, scale:[0.8, 0.2]});
        this.SQUARE(s, {scale:[0.5, 0.2]});
    },
    P_BLOCK(s) {
        this.SQUARE(s, {x: -0.2, scale:[0.25, 1]});
        this.SQUARE(s, {x: -0.1, y: 0.2, scale:[0.4, 0.6]});
        this.CIRCLE(s, {x: 0.1, y: 0.2, scale:[0.5, 0.6]});
        this.CIRCLE(s, {x: 0.01, y: 0.2, scale: 0.22, bri: 1});
    },
    A_BLOCK(s) {
        this.SQUARE(s, {x: -0.2, y: -0.2, scale:[0.3, 0.6], skew:[45.5, 0]});
        this.SQUARE(s, {x: 0.2, y: -0.2, scale:[0.3, 0.6], skew:[-45.5, 0]});
        this.TRIANGLE(s, {y: 0.2, scale:[0.44, 0.5]});
        this.SQUARE(s, {y: -0.25, scale:[0.44, 0.25]});
        this.TRIANGLE(s, {y: -0.1, scale:[0.2, 0.25], sat: -1, bri: 1});
    },
    C_BLOCK(s) {
        this.CIRCLE(s, {scale:[0.95, 1]});
        this.CIRCLE(s, {scale:0.5, bri: 1});
        this.SQUARE(s, {x: 0.25, scale:[0.46, 0.25], bri: 1});
    }
};

cfa.run(code);*/