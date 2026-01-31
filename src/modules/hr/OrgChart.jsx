import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const OrgChart = () => {
  const [expandedNodes, setExpandedNodes] = useState({ 1: true });

  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const TreeNode = ({ node }) => {
    const isExpanded = expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col items-center relative">
        <div
          className={`
                        relative flex flex-col items-center p-3 bg-white dark:bg-slate-800 rounded-xl border-2 transition-all cursor-pointer z-10 w-48
                        ${
                          isExpanded
                            ? "border-orange-500 shadow-lg"
                            : "border-slate-200 dark:border-slate-700 hover:border-orange-300"
                        }
                    `}
          onClick={() => toggleNode(node.id)}
        >
          <img
            src={node.avatar}
            alt={node.name}
            className="w-10 h-10 rounded-full object-cover mb-2 border-2 border-white dark:border-slate-700 shadow-sm"
          />
          <div className="text-center">
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate w-full">
              {node.name}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate w-full">
              {node.role}
            </p>
          </div>
          {hasChildren && (
            <button className="absolute -bottom-3 bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full w-5 h-5 flex items-center justify-center hover:text-orange-500 shadow-sm">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>
        )}

        {hasChildren && isExpanded && (
          <div className="flex items-start gap-4 pt-4 relative before:absolute before:top-0 before:left-1/2 before:-ml-px before:w-px before:h-4 before:bg-slate-300 dark:before:bg-slate-600">
            {node.children.length > 1 && (
              <div
                className="absolute top-0 left-0 right-0 h-px bg-slate-300 dark:bg-slate-600 mx-auto w-[calc(100%-12rem)]"
                style={{ transform: "translateY(0px)" }}
              ></div>
            )}

            {node.children.map((child) => (
              <div
                key={child.id}
                className="relative flex flex-col items-center"
              >
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 absolute -top-4"></div>
                <TreeNode node={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const hierarchyData = {
    id: "1",
    name: "Md Nayeeb",
    role: "CEO & Founder",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    children: [
      {
        id: "2",
        name: "Sarah Jenkins",
        role: "Head of Operations",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        children: [
          {
            id: "4",
            name: "James Wilson",
            role: "Field Coordinator",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            children: [],
          },
          {
            id: "5",
            name: "Emily Davis",
            role: "Data Analyst",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            children: [],
          },
        ],
      },
      {
        id: "3",
        name: "Michael Chen",
        role: "Head of Quality",
        avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        children: [
          {
            id: "6",
            name: "David Kim",
            role: "QC Specialist",
            avatar:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            children: [],
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-[#030F1D] dark:text-white">
          Organization Chart
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Visual hierarchy of the company structure.
        </p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 overflow-x-auto min-h-[600px] flex justify-center items-start pt-12 custom-scrollbar shadow-inner">
        <TreeNode node={hierarchyData} />
      </div>
    </div>
  );
};

export default OrgChart;
