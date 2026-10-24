import React, { useState } from 'react';
import {
  Bell,
  Code2,
  Shield,
  Monitor,
  Check,
  Save,
  Keyboard,
  Sliders,
} from 'lucide-react';
import { usePlacement } from '../context/PlacementContext';
import { companyProfiles, packageTiers, programmingLanguages } from '../data/companies';
import PageHeader from '../components/ui/PageHeader';

export default function SettingsPage() {
  const { missionTarget, updateTarget } = usePlacement();

  // Appearance & Workspace state
  const [theme, setTheme] = useState('light');
  const [editorFontSize, setEditorFontSize] = useState('14');
  const [tabSize, setTabSize] = useState('2');
  const [wordWrap, setWordWrap] = useState(true);

  // Notifications state
  const [dailyReminders, setDailyReminders] = useState(true);
  const [mockAlerts, setMockAlerts] = useState(true);
  const [oaReminderDays, setOaReminderDays] = useState('2');

  // Target preferences state
  const [targetCompany, setTargetCompany] = useState(missionTarget.company);
  const [targetPackage, setTargetPackage] = useState(missionTarget.pkg);
  const [targetLanguage, setTargetLanguage] = useState(missionTarget.language);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = () => {
    updateTarget({
      company: targetCompany,
      pkg: targetPackage,
      language: targetLanguage,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 text-left font-sans">
      {/* Standard Page Header */}
      <PageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        category="System & Configuration"
        title="Settings & Preferences"
        description="Configure appearance options, notification cadence, workspace keyboard shortcuts, and candidate target preferences."
      />

      {/* 01. Candidate Target Preferences */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-[#5B21B6] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#5B21B6]" />
          <span>Placement Target Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Target Company</label>
            <select
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              {companyProfiles.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Target Package Ceiling</label>
            <select
              value={targetPackage}
              onChange={(e) => setTargetPackage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#16A34A] font-bold focus:outline-none focus:border-[#5B21B6]"
            >
              {packageTiers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Primary Language</label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              {programmingLanguages.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 02. Appearance & Workspace Preferences */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-[#17152B] flex items-center gap-2">
          <Monitor className="w-4 h-4 text-[#5B21B6]" />
          <span>Appearance & Editor Preferences</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Theme Mode</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              <option value="light">Premium Light-First (Active)</option>
              <option value="system">Follow System</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Editor Font Size</label>
            <select
              value={editorFontSize}
              onChange={(e) => setEditorFontSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              <option value="12">12px (Compact)</option>
              <option value="14">14px (Standard)</option>
              <option value="16">16px (Comfortable)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[#625F72] block font-semibold">Tab Indentation</label>
            <select
              value={tabSize}
              onChange={(e) => setTabSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0] text-[#17152B] font-medium focus:outline-none focus:border-[#5B21B6]"
            >
              <option value="2">2 Spaces</option>
              <option value="4">4 Spaces</option>
            </select>
          </div>
        </div>
      </section>

      {/* 03. Notification Preferences */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-[#17152B] flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#5B21B6]" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0]">
            <div>
              <span className="text-xs font-bold text-[#17152B] block">Daily Problem Reminders</span>
              <span className="text-[11px] text-[#625F72]">Receive alert when today's practice challenge is available</span>
            </div>
            <input
              type="checkbox"
              checked={dailyReminders}
              onChange={(e) => setDailyReminders(e.target.checked)}
              className="w-4 h-4 accent-[#5B21B6] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9FF] border border-[#E8E4F0]">
            <div>
              <span className="text-xs font-bold text-[#17152B] block">Mock Assessment Advance Notice</span>
              <span className="text-[11px] text-[#625F72]">Advance schedule reminder before timed sectional simulations</span>
            </div>
            <select
              value={oaReminderDays}
              onChange={(e) => setOaReminderDays(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E4F0] text-xs text-[#17152B] font-medium"
            >
              <option value="1">24 hours before</option>
              <option value="2">48 hours before</option>
              <option value="3">3 days before</option>
            </select>
          </div>
        </div>
      </section>

      {/* 04. Keyboard Shortcuts Quick Reference */}
      <section className="rounded-2xl p-6 bg-white border border-[#E8E4F0] space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase text-[#17152B] flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-[#5B21B6]" />
          <span>Keyboard Shortcuts Reference</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#FAF9FF] flex items-center justify-between border border-[#E8E4F0]">
            <span className="text-[#17152B] font-medium">Open Command Center</span>
            <kbd className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#17152B] border border-[#E8E4F0] shadow-2xs">Ctrl + K</kbd>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9FF] flex items-center justify-between border border-[#E8E4F0]">
            <span className="text-[#17152B] font-medium">Toggle Keyboard Cheatsheet</span>
            <kbd className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#17152B] border border-[#E8E4F0] shadow-2xs">?</kbd>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9FF] flex items-center justify-between border border-[#E8E4F0]">
            <span className="text-[#17152B] font-medium">Quick Search</span>
            <kbd className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#17152B] border border-[#E8E4F0] shadow-2xs">/</kbd>
          </div>
          <div className="p-3 rounded-xl bg-[#FAF9FF] flex items-center justify-between border border-[#E8E4F0]">
            <span className="text-[#17152B] font-medium">Navigate to Dashboard</span>
            <kbd className="px-2 py-0.5 rounded text-[11px] font-mono bg-white text-[#17152B] border border-[#E8E4F0] shadow-2xs">G + H</kbd>
          </div>
        </div>
      </section>

      {/* Save Settings Action Button */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-[#625F72]">
          Preferences sync locally to your placement preparation workspace.
        </span>

        <button
          type="button"
          onClick={handleSaveSettings}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#5B21B6] hover:bg-[#4C1D95] text-white transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Saved Successfully</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-white" />
              <span>Save Preferences</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
