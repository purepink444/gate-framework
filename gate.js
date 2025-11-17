// ========================================
//          GATE FRAMEWORK SERVER
// ========================================

const express = require('express');
const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');

const app = express();
const port = 1012;

// ==============================
//       View Engine Setup
// ==============================
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// ==============================
//       Static Files
// ==============================
app.use(express.static('public')); // Serve static files from /public

// ==============================
//      Middleware - Logger
// ==============================
app.use((req, res, next) => {
    const now = new Date().toLocaleTimeString();
    console.log(`[${chalk.cyan(now)}] ${chalk.green(req.method)} ${chalk.yellow(req.url)}`);
    next(); // Continue to the next middleware/route
});

// ==============================
//            Routes
// ==============================
app.get('/', (req, res) => {
    res.render('gate'); // Render views/gate.ejs
});

// ==============================
//         Start Server
// ==============================
app.listen(port, () => {
    // ---- ASCII Art Header ----
    figlet('GATE FRAMEWORK', (err, data) => {
        if (err) return console.error('Figlet error:', err);
        console.log(chalk.hex('#ff66aa')('Created By PurePink \n'));
        console.log(gradient.pastel.multiline(data));
        console.log(chalk.rgb(255, 51, 153).bold(`🎀 Server running at http://127.0.0.1:${port} 🎀`));
        console.log(chalk.hex('#ff66aa')('✨ Welcome to Pink GATE World! ✨\n'));
    });

    // ---- Real-time Request Counter ----
    let requestsHandled = 0;

    // Update the counter in real-time
    setInterval(() => {
        process.stdout.write(chalk.yellow(`Requests handled: ${requestsHandled}\r`));
    }, 2000);

    // Simulate request count increment every 3 seconds
    setInterval(() => {
        requestsHandled += Math.floor(Math.random() * 3);
    }, 3000);
});
