const fs = require('fs');

const files = [
"src/controllers/authController.js",
"src/controllers/workerController.js",  
"src/controllers/bookingController.js",
"src/controllers/paymentController.js",
"src/controllers/ratingController.js",
"src/controllers/grievanceController.js",
"src/controllers/adminController.js",
"src/routes/authRoutes.js",
"src/routes/workerRoutes.js",
"src/routes/bookingRoutes.js",
"src/routes/paymentRoutes.js",
"src/routes/ratingRoutes.js",
"src/routes/grievanceRoutes.js",
"src/routes/adminRoutes.js",
"src/services/matchingService.js",
"src/services/paymentSplitService.js",
"src/services/geocodingService.js",
"src/services/forecastingService.js",
"src/services/auditService.js",
"src/seed/seedData.js"
];

for (const f of files) {
    if (!fs.existsSync(f)) {
        console.log("Missing:", f);
        continue;
    }
    let code = fs.readFileSync(f, 'utf8');
    
    // Default imports: import X from 'Y' -> const X = require('Y')
    code = code.replace(/import\s+([a-zA-Z0-9_$]+)\s+from\s+['"]([^'"]+)['"];?/g, (match, p1, p2) => {
        const p = p2.replace(/\.js$/, '');
        return `const ${p1} = require('${p}');`;
    });
    
    // Named imports: import { X, Y } from 'Z'
    code = code.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];?/g, (match, p1, p2) => {
        const p = p2.replace(/\.js$/, '');
        return `const { ${p1} } = require('${p}');`;
    });

    // export const X = ... -> exports.X = ...
    code = code.replace(/export\s+const\s+([a-zA-Z0-9_$]+)\s*=/g, 'exports.$1 =');
    // export let X = ... -> exports.X = ...
    code = code.replace(/export\s+let\s+([a-zA-Z0-9_$]+)\s*=/g, 'exports.$1 =');

    // export default X -> module.exports = X
    code = code.replace(/export\s+default\s+([a-zA-Z0-9_$]+);?/g, 'module.exports = $1;');
    
    // export default router; or function
    code = code.replace(/export\s+default\s+(function|class)/g, 'module.exports = $1');

    // export { X, Y } -> module.exports = { X, Y }
    code = code.replace(/export\s+\{\s*([^}]+)\s*\};?/g, 'module.exports = { $1 };');

    fs.writeFileSync(f, code, 'utf8');
    console.log("Converted:", f);
}
