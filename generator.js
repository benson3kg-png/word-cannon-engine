const fs = require('fs');
const path = require('path');

const ENGINE_CONFIG = {
    DEPLOY_DIR: __dirname,
    LOCALE: 'en-US',
    COMPRESSION: 'utf8'
};

const REGISTRY_DATA = [
    { token: "truck-collision-attorney", title: "Commercial Fleet Collision Claims Registry", sector: "Transportation Tort Law", metric: "$1,003.68 CPC Value", summary: "Comprehensive analytical data clearinghouse for interstate commercial trucking litigation, FMCSA safety violation tracking, and corporate insurance liability frameworks." },
    { token: "best-mesothelioma-lawyer", title: "Asbestos Litigation & Toxic Tort Directory", sector: "Toxic Substance Tort Law", metric: "$935.00 CPC Value", summary: "Structured diagnostic index outlining multi-district trust fund distributions, historical class-action settlements, and certified toxic exposure legal advocates." },
    { token: "oil-rig-injury-lawyer", title: "Maritime Industrial Injury Settlement Database", sector: "Admiralty & Maritime Jurisprudence", metric: "$747.84 CPC Value", summary: "Data depository tracking Jones Act regulatory compliance, offshore platform safety audits, and maritime accident compensation benchmarks." },
    { token: "linkedin-advertising-agency", title: "B2B Programmatic Ad Agency Assessment Index", sector: "Enterprise Digital Marketing", metric: "$652.25 CPC Value", summary: "Independent analytical matrix evaluating global enterprise marketing channels, LinkedIn programmatic ad delivery networks, and account-based marketing performance metrics." },
    { token: "structured-settlement-annuity-companies", title: "Structured Settlement & Annuity Factoring Index", sector: "Corporate Financial Liquidity", metric: "$1,000.00 CPC Value", summary: "Financial evaluation framework mapping IRC Section 130 secondary market operations, annuity asset purchasing guidelines, and corporate solvency metrics." }
];

async function runSystemBuild() {
    let directoryLinksHTML = '';
    for (const item of REGISTRY_DATA) {
        directoryLinksHTML += `<div style="background:#0f172a; border:1px solid #1e293b; padding:20px; border-radius:6px; margin-bottom:15px;"><h3 style="margin:0 0 8px 0;"><a href="./${item.token}.html" style="color:#38bdf8; text-decoration:none; font-size:18px;">${item.title}</a></h3><p style="margin:0 0 10px 0; font-size:14px; color:#94a3b8;">${item.summary}</p><div style="font-size:12px; color:#64748b;"><span style="background:#1e293b; padding:3px 8px; border-radius:3px; color:#cbd5e1; margin-right:10px;">Sector: ${item.sector}</span><span style="background:#0369a1; padding:3px 8px; border-radius:3px; color:#f0f9ff; font-weight:bold;">${item.metric}</span></div></div>`;
        const pageContent = `<!DOCTYPE html><html lang="${ENGINE_CONFIG.LOCALE}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${item.title}</title><style>body{font-family:monospace;background-color:#020617;color:#94a3b8;line-height:1.7;max-width:800px;margin:40px auto;padding:0 20px;}main{background-color:#0f172a;border:1px solid #1e293b;padding:30px;border-radius:6px;}h1{color:#38bdf8;border-bottom:1px solid #334155;padding-bottom:12px;margin-top:0;font-size:24px;}.data-card{background:#070a13;border:1px solid #1e293b;border-radius:4px;padding:20px;margin:20px 0;}</style></head><body><main><h1>${item.title}</h1><div class="data-card"><h3>Operational Profile</h3><p>${item.summary}</p></div></main></body></html>`;
        fs.writeFileSync(path.join(ENGINE_CONFIG.DEPLOY_DIR, `${item.token}.html`), pageContent, ENGINE_CONFIG.COMPRESSION);
    }
    const indexContent = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ENTERPRISE CORPORATE DATA REGISTRY</title></head><body style="font-family:monospace;background-color:#020617;color:#94a3b8;max-width:800px;margin:40px auto;padding:20px;"><h1>ENTERPRISE MARKET DATA HUB DIRECTORY</h1><div>${directoryLinksHTML}</div></body></html>`;
    fs.writeFileSync(path.join(ENGINE_CONFIG.DEPLOY_DIR, 'index.html'), indexContent, ENGINE_CONFIG.COMPRESSION);
    console.log("[LAUNCHED]: All Corporate Data Cards Built Locally.");
}
runSystemBuild();
