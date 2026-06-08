import React from 'react';
import { ImpactCharts } from './ImpactCharts';
import { Download, Award, Trees, Flame } from 'lucide-react';
import jsPDF from 'jspdf';

export const Dashboard = ({ data }) => {
  const { summary, breakdown, recommendations } = data;

  const downloadPDFReport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Carbon Footprint Analysis Report", 20, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    doc.line(20, 40, 190, 40);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Executive Analytics Summary", 20, 52);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Total Monthly Carbon Output: ${summary.totalEmissions} kg CO2e`, 25, 62);
    doc.text(`Sustainability Score Performance: ${summary.sustainabilityScore}/100`, 25, 70);
    doc.text(`Afforestation Countermeasure Required: ${summary.treesNeeded} mature trees`, 25, 78);

    doc.setFont("helvetica", "bold");
    doc.text("Categorized Breakdown Allocations", 20, 92);
    doc.setFont("helvetica", "normal");
    doc.text(`- Electricity Infrastructure Grid Footprint: ${breakdown.electricity} kg CO2e`, 25, 102);
    doc.text(`- Transit Systems Emission Footprint: ${breakdown.transport} kg CO2e`, 25, 110);

    doc.setFont("helvetica", "bold");
    doc.text("Targeted Mitigation Protocols", 20, 125);
    doc.setFont("helvetica", "normal");
    let yPos = 135;
    recommendations.forEach((rec, idx) => {
      doc.text(`${idx + 1}. ${rec}`, 25, yPos, { maxWidth: 160 });
      yPos += 12;
    });

    doc.save("Carbon_Footprint_Report.pdf");
  };

  return (
    <div className="space-y-6">
      {/* Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-500 rounded-xl">
            <Flame size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Monthly Output</p>
            <h4 className="text-2xl font-black mt-0.5">{summary.totalEmissions} <span className="text-sm font-normal text-slate-500">kg</span></h4>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 rounded-xl">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Eco Score</p>
            <h4 className="text-2xl font-black mt-0.5">{summary.sustainabilityScore}<span className="text-sm font-normal text-slate-500"> /100</span></h4>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-500 rounded-xl">
            <Trees size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Tree Offset Equiv.</p>
            <h4 className="text-2xl font-black mt-0.5">{summary.treesNeeded} <span className="text-sm font-normal text-slate-500">trees/yr</span></h4>
          </div>
        </div>
      </div>

      {/* Analytics Graph & Mitigation Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImpactCharts breakdown={breakdown} />
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4">Targeted Strategic Recommendations</h3>
            <ul className="space-y-3.5">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center bg-emerald-500 text-white font-bold text-xs h-5 w-5 rounded-full shrink-0 mt-0.5">{index+1}</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={downloadPDFReport}
            className="mt-6 w-full lg:w-fit px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition tracking-wide active:scale-[0.98]"
          >
            <Download size={16} /> Download Compliance Report
          </button>
        </div>
      </div>
    </div>
  );
};