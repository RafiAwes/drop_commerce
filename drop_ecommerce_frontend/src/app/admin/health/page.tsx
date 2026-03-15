
"use client";

import { Activity, Server, Database, Globe, RefreshCw, CheckCircle2, AlertTriangle, Wifi } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function AdminHealthPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">System Health</h1>
          <p className="text-slate-500">Real-time status of services and infrastructure.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          className="h-11 rounded-xl border-slate-200 font-bold"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
          Refresh Metrics
        </Button>
      </div>

      {/* Main Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <HealthMetricCard 
          title="Server Cluster" 
          status="Operational" 
          icon={Server} 
          uptime="99.98%" 
          load={12} 
        />
        <HealthMetricCard 
          title="Firestore DB" 
          status="Operational" 
          icon={Database} 
          uptime="100%" 
          load={4} 
        />
        <HealthMetricCard 
          title="Global Edge" 
          status="Healthy" 
          icon={Globe} 
          uptime="99.99%" 
          load={24} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold">API Performance</CardTitle>
            <CardDescription>Response times for core endpoints.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <LatencyMetric label="GET /products" time="124ms" value={15} />
            <LatencyMetric label="POST /orders" time="450ms" value={45} />
            <LatencyMetric label="GET /analytics" time="892ms" value={85} color="amber" />
            <LatencyMetric label="AUTH /verify" time="82ms" value={8} />
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Incident Log</CardTitle>
              <CardDescription>Recent system events.</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-slate-300" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              <IncidentItem 
                type="Resolved" 
                title="Checkout Slowdown" 
                time="2 hours ago" 
                desc="Resolved increased latency in Stripe gateway connections." 
              />
              <IncidentItem 
                type="Info" 
                title="Scheduled Maintenance" 
                time="Yesterday" 
                desc="Completed DB indexing for the Q4 collection launch." 
              />
              <IncidentItem 
                type="Warning" 
                title="API Quota Alert" 
                time="2 days ago" 
                desc="Image optimization service reached 85% of monthly quota." 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function HealthMetricCard({ title, status, icon: Icon, uptime, load }: any) {
  return (
    <Card className="border-slate-200 group">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-2xl bg-indigo-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <Icon className="h-6 w-6" />
          </div>
          <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] h-6">
            <CheckCircle2 className="h-3 w-3 mr-1" /> {status}
          </Badge>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
            <p className="text-xl font-bold">{uptime} Uptime</p>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold uppercase">
              <span className="text-slate-400">Current Load</span>
              <span className="text-primary">{load}%</span>
            </div>
            <Progress value={load} className="h-1.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LatencyMetric({ label, time, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{label}</span>
        <div className="flex items-center space-x-2">
          <Wifi className={`h-3 w-3 ${color === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`} />
          <span className="text-xs font-medium text-slate-500">{time}</span>
        </div>
      </div>
      <Progress value={value} className={`h-2 ${color === 'amber' ? '[&>div]:bg-amber-400' : ''}`} />
    </div>
  );
}

function IncidentItem({ type, title, time, desc }: any) {
  return (
    <div className="p-6 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge className={
            type === 'Resolved' ? "bg-emerald-50 text-emerald-600" :
            type === 'Warning' ? "bg-amber-50 text-amber-600" :
            "bg-blue-50 text-blue-600"
          }>
            {type}
          </Badge>
          <span className="text-sm font-bold">{title}</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">{time}</span>
      </div>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  );
}
