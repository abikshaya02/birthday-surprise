
/* ---- Change these words and republish ---- */
var CONFIG = {
  eyebrow: "today is all about you",
  name: "My Love",
  line: "Wishing you a year as warm as you make my days.",
  hindi: "I Love You ❤️"
};

(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  var heartWrap = $("heart-wrap"), cupid = $("cupid"), arrow = $("arrow"), ring = $("ring"), ring2 = $("ring2"),
    rays = $("rays"), flash = $("flash"),
    wish = $("wish"), replay = $("replay"), cv = $("fx"), bgc = $("bg"),
    cupidFly = $("cupid-fly"), cupidImg = $("cupid-img");

  $("w-eyebrow").textContent = CONFIG.eyebrow;
  $("w-name").textContent = CONFIG.name;
  $("w-line").textContent = CONFIG.line;
  $("w-hindi").textContent = CONFIG.hindi;

  /* ---- canvases: warm bokeh, gold dust and petals behind; particles in front ---- */
  var cx = cv.getContext("2d"), bx = bgc.getContext("2d"), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

  function size() {
    W = window.innerWidth;
    H = window.innerHeight;
    [cv, bgc].forEach(function (c) {
      c.width = W * dpr;
      c.height = H * dpr;
    });
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    bx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  size();
  window.addEventListener("resize", size);

  var PETAL = ["#8f0f33", "#b81744", "#d6254f", "#e8627a"];
  var HEARTC = ["#e0234e", "#ff5c7a", "#f2a58f", "#ffe2b8", "#fff6ea"];
  var SPARK = ["#ffe7a8", "#fff6e0", "#f4c36b"];
  var FW = ["#ffe7a8", "#f4c36b", "#ffb3a0", "#fff6ea"];
  var BK = ["255,200,130", "255,140,120", "220,80,130", "255,225,170"];

  var dust = [], bokeh = [], bgPetals = [];

  for (var di = 0; di < 70; di++)
    dust.push({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.3,
      ph: Math.random() * 6.28,
      sp: 0.5 + Math.random() * 1.2,
      vy: 0.00004 + Math.random() * 0.00008
    });

  for (var bi = 0; bi < 8; bi++)
    bokeh.push({
      x: Math.random(),
      y: Math.random(),
      r: 60 + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.00005,
      vy: -0.00002 - Math.random() * 0.00004,
      c: BK[bi % BK.length],
      a: 0.05 + Math.random() * 0.06
    });

  function newPetal(top) {
    return {
      x: Math.random(),
      y: top ? -0.05 : Math.random(),
      s: 0.6 + Math.random() * 0.9,
      vy: 0.00012 + Math.random() * 0.0002,
      sw: 0.0004 + Math.random() * 0.0008,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * 6.28,
      fv: 0.02 + Math.random() * 0.04,
      c: PETAL[Math.floor(Math.random() * PETAL.length)],
      a: 0.5 + Math.random() * 0.4,
      ph: Math.random() * 6.28
    };
  }

  for (var pi = 0; pi < 14; pi++)
    bgPetals.push(newPetal(false));

  function petalPath(c) {
    c.beginPath();
    c.moveTo(0, -10);
    c.bezierCurveTo(9, -5, 8, 7, 0, 10);
    c.bezierCurveTo(-8, 7, -9, -5, 0, -10);
  }

  function drawPetal(c, x, y, s, rot, flip, col, a) {
    c.save();
    c.translate(x, y);
    c.rotate(rot);
    c.scale(s * (0.25 + 0.75 * Math.abs(Math.cos(flip))), s);
    c.globalAlpha = Math.max(a, 0);
    c.fillStyle = col;
    petalPath(c);
    c.fill();
    c.restore();
  }

  function drawBg(t, dt) {
    bx.clearRect(0, 0, W, H);
    var i, g;

    for (i = 0; i < bokeh.length; i++) {
      var b = bokeh[i];

      if (!reduce) {
        b.x += b.vx * dt * 16;
        b.y += b.vy * dt * 16;
        if (b.y < -0.2) {
          b.y = 1.2;
          b.x = Math.random();
        }
      }

      var gx = b.x * W, gy = b.y * H;
      g = bx.createRadialGradient(gx, gy, 0, gx, gy, b.r);
      g.addColorStop(0, "rgba(" + b.c + "," + b.a + ")");
      g.addColorStop(1, "rgba(" + b.c + ",0)");
      bx.fillStyle = g;
      bx.beginPath();
      bx.arc(gx, gy, b.r, 0, 6.283);
      bx.fill();
    }

    for (i = 0; i < dust.length; i++) {
      var d = dust[i];

      if (!reduce) {
        d.y -= d.vy * dt * 16;
        if (d.y < -0.02) {
          d.y = 1.02;
          d.x = Math.random();
        }
      }

      var tw = reduce ? 0.7 : 0.5 + 0.5 * Math.sin(t / 1000 * d.sp + d.ph);
      bx.fillStyle = "rgba(255,226,160," + (0.12 + 0.6 * tw).toFixed(3) + ")";
      bx.beginPath();
      bx.arc(d.x * W, d.y * H, d.r, 0, 6.283);
      bx.fill();
    }

    for (i = 0; i < bgPetals.length; i++) {
      var p = bgPetals[i];

      if (!reduce) {
        p.y += p.vy * dt * 16;
        p.x += Math.sin(t / 1400 + p.ph) * p.sw * dt;
        p.rot += p.vr * dt;
        p.flip += p.fv * dt;

        if (p.y > 1.06)
          bgPetals[i] = p = newPetal(true);
      }

      drawPetal(bx, p.x * W, p.y * H, p.s * 0.9, p.rot, p.flip, p.c, p.a * 0.75);
    }
  }

  var parts = [], rainTimer = null, riseTimer = null, fwTimer = null, run = 0;

  function drawHeart(p) {
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.rot);
    cx.scale(p.s, p.s);
    cx.globalAlpha = Math.max(p.a, 0);
    cx.fillStyle = p.c;
    cx.shadowColor = p.c;
    cx.shadowBlur = 12;
    cx.beginPath();
    cx.moveTo(0, 6);
    cx.bezierCurveTo(-14, -4, -8, -16, 0, -8);
    cx.bezierCurveTo(8, -16, 14, -4, 0, 6);
    cx.fill();
    cx.restore();
  }

  function drawStar(p) {
    var r = p.s * 5;
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.rot);
    cx.globalAlpha = Math.max(p.a, 0);
    cx.fillStyle = p.c;
    cx.shadowColor = p.c;
    cx.shadowBlur = 10;
    cx.beginPath();
    cx.moveTo(0, -r);
    cx.quadraticCurveTo(0, 0, r, 0);
    cx.quadraticCurveTo(0, 0, 0, r);
    cx.quadraticCurveTo(0, 0, -r, 0);
    cx.quadraticCurveTo(0, 0, 0, -r);
    cx.fill();
    cx.restore();
  }

  function drawDot(p) {
    cx.save();
    cx.globalAlpha = Math.max(p.a, 0);
    cx.fillStyle = p.c;
    cx.shadowColor = p.c;
    cx.shadowBlur = 9;
    cx.beginPath();
    cx.arc(p.x, p.y, 1.7 * p.s, 0, 6.283);
    cx.fill();
    cx.restore();
  }

  function drawShape(p) {
    if (p.shape === "petal")
      drawPetal(cx, p.x, p.y, p.s * 0.9, p.rot, p.flip, p.c, p.a);
    else
      drawHeart(p);
  }

  /* the big heart pops: hearts and petals start inside its outline and spill outward, then fall */
  function burst(x, y, R, n) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.283;
      var sp = 1.5 + Math.random() * 7;
      var petal = i % 4 === 0;

      parts.push({
        kind: "heart",
        shape: petal ? "petal" : "heart",
        x: x + (Math.random() - 0.5) * R * 1.2,
        y: y + (Math.random() - 0.5) * R * 0.9,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 4,
        s: petal ? 0.8 + Math.random() * 0.8 : 0.5 + Math.random() * 1.3,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.22,
        flip: Math.random() * 6.28,
        fv: 0.08,
        c: petal ? PETAL[i % PETAL.length] : HEARTC[i % HEARTC.length],
        a: 1,
        b: 0,
        rest: 0,
        floor: H - 22 - Math.random() * 26,
        ph: 0
      });
    }
  }

  function sparkBurst(x, y, n, spread) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.283;
      var sp = 1.5 + Math.random() * spread;

      parts.push({
        kind: "spark",
        x: x,
        y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        s: 0.5 + Math.random() * 1.1,
        rot: Math.random() * 6.28,
        c: SPARK[i % SPARK.length],
        a: 1
      });
    }
  }

  function trail(x, y) {
    parts.push({
      kind: "spark",
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      s: 0.35 + Math.random() * 0.6,
      rot: Math.random() * 6.28,
      c: SPARK[Math.floor(Math.random() * SPARK.length)],
      a: 0.9
    });
  }

  function riseOne() {
    var hr = heartWrap.getBoundingClientRect();

    parts.push({
      kind: "rise",
      shape: "heart",
      x: hr.left + hr.width * (0.15 + Math.random() * 0.7),
      y: hr.top + hr.height * 0.6,
      vy: -(0.5 + Math.random() * 0.8),
      s: 0.3 + Math.random() * 0.4,
      rot: (Math.random() - 0.5) * 0.6,
      c: HEARTC[Math.floor(Math.random() * 3)],
      a: 0.6,
      ph: Math.random() * 6.28
    });
  }

  function rainOne() {
    if (parts.length > 200) return;

    var petal = Math.random() < 0.7;

    parts.push({
      kind: "rain",
      shape: petal ? "petal" : "heart",
      x: Math.random() * W,
      y: -20,
      vy: 0.8 + Math.random() * 1.2,
      s: petal ? 0.7 + Math.random() * 0.7 : 0.35 + Math.random() * 0.5,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.04,
      flip: Math.random() * 6.28,
      fv: 0.05,
      c: petal ? PETAL[Math.floor(Math.random() * PETAL.length)] : HEARTC[Math.floor(Math.random() * HEARTC.length)],
      a: 0.85,
      ph: Math.random() * 6.28
    });
  }

  function firework() {
    var x = W * (0.15 + Math.random() * 0.7);
    var y = H * (0.08 + Math.random() * 0.4);
    var n = 34;
    var col = FW[Math.floor(Math.random() * FW.length)];

    for (var i = 0; i < n; i++) {
      var a = i / n * 6.283 + Math.random() * 0.2;
      var sp = 2 + Math.random() * 2.6;

      parts.push({
        kind: "fw",
        x: x,
        y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        s: 0.6 + Math.random() * 0.6,
        c: col,
        a: 1
      });
    }
  }

  var last = 0;

  function loop(t) {
    var dt = Math.min((t - last) / 16.7, 3);
    last = t;

    drawBg(t, dt);
    cx.clearRect(0, 0, W, H);

    for (var i = parts.length - 1; i >= 0; i--) {
      var p = parts[i];

      if (p.kind === "rain") {
        p.y += p.vy * dt;
        p.x += Math.sin(t / 600 + p.ph) * 0.6 * dt;
        p.rot += p.vr * dt;
        p.flip += p.fv * dt;

        if (p.y > H + 30) {
          parts.splice(i, 1);
          continue;
        }

        drawShape(p);

      } else if (p.kind === "rise") {
        p.y += p.vy * dt;
        p.x += Math.sin(t / 500 + p.ph) * 0.4 * dt;
        p.a -= 0.0045 * dt;

        if (p.a <= 0) {
          parts.splice(i, 1);
          continue;
        }

        drawHeart(p);

      } else if (p.kind === "spark") {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.02 * dt;
        p.vx *= 0.985;
        p.rot += 0.06 * dt;
        p.a -= 0.022 * dt;

        if (p.a <= 0) {
          parts.splice(i, 1);
          continue;
        }

        drawStar(p);

      } else if (p.kind === "fw") {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.045 * dt;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.a -= 0.013 * dt;

        if (p.a <= 0) {
          parts.splice(i, 1);
          continue;
        }

        drawDot(p);

      } else {
        p.vy += 0.38 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.fv * dt;
        p.vx *= 0.995;

        if (p.y > p.floor) {
          p.y = p.floor;

          if (Math.abs(p.vy) > 2.2 && p.b < 2) {
            p.vy = -p.vy * 0.42;
            p.vx *= 0.6;
            p.b++;
            p.vr *= 0.5;
          } else {
            p.vy = 0;
            p.vx = 0;
            p.vr = 0;
            p.fv = 0;
            p.rest += dt;
          }
        }

        if (p.rest > 140) {
          p.a -= 0.012 * dt;
          if (p.a <= 0) {
            parts.splice(i, 1);
            continue;
          }
        }

        if (p.x < -40 || p.x > W + 40) {
          parts.splice(i, 1);
          continue;
        }

        drawShape(p);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  /* ---- helpers ---- */
  function sleep(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }

  function tween(ms, fn, id) {
    return new Promise(function (res) {
      var s = performance.now();

      (function step(now) {
        if (id !== run) {
          res();
          return;
        }

        var p = Math.min((now - s) / ms, 1);
        fn(p);

        if (p < 1)
          requestAnimationFrame(step);
        else
          res();
      })(s);
    });
  }

  var AOX = 130, AOY = 15;

  /* arrow tip inside its own box */
  function place(tx, ty, ang) {
    arrow.style.transform =
      "translate(" + (tx - AOX) + "px," + (ty - AOY) + "px) rotate(" + ang + "deg)";
  }

  function reset() {
    clearInterval(rainTimer);
    clearInterval(riseTimer);
    clearInterval(fwTimer);

    rainTimer = riseTimer = fwTimer = null;
    parts.length = 0;

    heartWrap.className = "heart-wrap";
    cupid.className = "cupid float";

    [ring, ring2, rays, flash].forEach(function (e) {
      e.classList.remove("go");
    });

    arrow.style.opacity = 0;
    wish.hidden = true;
    replay.hidden = true;

    cupidFly.style.transition = "none";
    cupidFly.style.transform = "";
    cupidImg.style.translate = "0 0";
    arrow.style.filter = "";
  }

  function showWish(id) {
    wish.hidden = false;

    setTimeout(function () {
      if (id !== run) return;

      rainTimer = setInterval(rainOne, 300);

      if (!reduce) {
        firework();
        fwTimer = setInterval(firework, 1700);
      }
    }, 500);

    setTimeout(function () {
      if (id === run)
        replay.hidden = false;
    }, 3400);
  }

  /* ---- the story ---- */
  async function play() {
    var id = ++run;
    reset();

    if (reduce) {
      heartWrap.classList.add("gone");
      showWish(id);
      return;
    }

    riseTimer = setInterval(riseOne, 520);

    /* little hearts drift up while it beats */
    await sleep(3600);
    if (id !== run) return;

    cupid.classList.add("in");

    /* Cupid flies in from the top right */
    await sleep(1400);
    if (id !== run) return;

    var cr = cupid.getBoundingClientRect();
    var hr = heartWrap.getBoundingClientRect();

    var k = cr.width / 468;
    var LEN = 250 * k;

    /* sprite is 468px wide; arrow is 250 sprite-px long */
    var fx0 = cr.left + 237 * k;
    var fy0 = cr.top + 332 * k;

    /* the hand holding the bow */
    var hx = hr.left + hr.width / 2;
    var hy = hr.top + hr.height / 2;
    var R = hr.width / 2;

    var ang0 = Math.atan2(hy - fy0, hx - fx0) * 180 / Math.PI;
    var rot = Math.max(-28, Math.min(28, ang0 - 145.9));

    /* turn Cupid to face the heart */
    var ang = 145.9 + rot;
    var rad = ang * Math.PI / 180;
    var ux = Math.cos(rad);
    var uy = Math.sin(rad);

    cupid.classList.remove("float");

    cupidFly.style.transition = "transform .5s ease-in-out";
    cupidFly.style.transform = "rotate(" + rot + "deg)";

    var sa = LEN / 131;

    /* size the arrow to the sprite */
    AOX = 131 * sa;
    AOY = 15 * sa;

    arrow.style.width = (140 * sa) + "px";
    arrow.style.height = (30 * sa) + "px";
    arrow.style.transformOrigin = AOX + "px " + AOY + "px";

    var sx = fx0 + ux * LEN;
    var sy = fy0 + uy * LEN;

    /* arrow tip while resting on the bow */
    await sleep(550);
    if (id !== run) return;

    place(sx, sy, ang);
    arrow.style.opacity = 1;

    await tween(450, function (p) {
      /* the arrow charges up */
      if (Math.random() < 0.6)
        trail(
          sx + (Math.random() - 0.5) * 18,
          sy + (Math.random() - 0.5) * 18
        );

      arrow.style.filter =
        "drop-shadow(0 0 " + (7 + p * 14).toFixed(1) + "px rgba(255,214,140,1))";
    }, id);

    if (id !== run) return;

    var tx = hx - Math.cos(Math.atan2(hy - sy, hx - sx)) * R * 0.2;
    var ty = hy - Math.sin(Math.atan2(hy - sy, hx - sx)) * R * 0.2;

    var angF = Math.atan2(ty - sy, tx - sx) * 180 / Math.PI;

    cupidImg.style.translate =
      (-ux * 8) + "px " + (-uy * 8) + "px";

    /* recoil */
    setTimeout(function () {
      cupidImg.style.translate = "0 0";
    }, 140);

    await tween(520, function (p) {
      /* release */
      var e = p * p;
      var cxp = sx + (tx - sx) * e;
      var cyp = sy + (ty - sy) * e;

      place(cxp, cyp, ang + (angF - ang) * e);

      trail(
        cxp - ux * (20 + Math.random() * 70),
        cyp - uy * (20 + Math.random() * 70)
      );
    }, id);

    if (id !== run) return;

    /* arrow lands */
    clearInterval(riseTimer);
    heartWrap.classList.add("hit");

    flash.style.setProperty("--fx", hx + "px");
    flash.style.setProperty("--fy", hy + "px");

    [ring, ring2, rays].forEach(function (e) {
      e.style.left = hx + "px";
      e.style.top = hy + "px";
    });

    [ring, ring2, rays, flash].forEach(function (e) {
      e.classList.add("go");
    });

    sparkBurst(tx, ty, 26, 7);

    await sleep(600);
    if (id !== run) return;

    /* heart pops into little hearts and petals */
    heartWrap.classList.add("gone");

    burst(hx, hy, R, 110);
    sparkBurst(hx, hy, 40, 9);

    cupid.classList.add("out");

    tween(900, function (p) {
      place(
        tx + p * 30,
        ty + p * p * 260,
        angF + p * 50
      );
      arrow.style.opacity = 1 - p;
    }, id);

    await sleep(1200);
    if (id !== run) return;

    showWish(id);
  }

  replay.addEventListener("click", play);
  play();

})();
