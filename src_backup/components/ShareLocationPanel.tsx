import { useState } from "react";
import { motion } from "motion/react";
import { X, Share2, Copy, MessageCircle, Mail, Link2, Check } from "lucide-react";
import type { LanguageCode } from "../utils/translations";

const t = (key: string, lang: LanguageCode) => key; // Stub for now
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface ShareLocationPanelProps {
  currentLanguage: LanguageCode;
  userLocation: { lat: number; lng: number } | null;
  onClose: () => void;
}

export function ShareLocationPanel({
  currentLanguage,
  userLocation,
  onClose
}: ShareLocationPanelProps) {
  const [copied, setCopied] = useState(false);

  const locationUrl = userLocation 
    ? `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`
    : '';

  const locationText = userLocation
    ? `My Location: ${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}`
    : 'Location not available';

  const handleCopyToClipboard = async () => {
    const success = await copyToClipboard(locationUrl);
    
    if (success) {
      setCopied(true);
      toast.success('Copied!', {
        description: 'Location link copied to clipboard'
      });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Copy failed', {
        description: 'Please copy manually:\n' + locationUrl.substring(0, 50) + '...'
      });
    }
  };

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(locationText + ' ' + locationUrl)}`, '_blank');
      }
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: copied ? Check : Copy,
      color: 'from-blue-500 to-blue-600',
      action: handleCopyToClipboard
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'from-purple-500 to-purple-600',
      action: () => {
        window.location.href = `mailto:?subject=My Location&body=${encodeURIComponent(locationText + '\n\n' + locationUrl)}`;
      }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Share Location
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Share your current location
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Location info */}
        {userLocation ? (
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Current Coordinates
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono break-all">
                  {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 mb-6 text-center">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Please enable location access to share
            </p>
          </div>
        )}

        {/* Share options */}
        <div className="space-y-3">
          {shareOptions.map((option) => (
            <Button
              key={option.id}
              onClick={option.action}
              disabled={!userLocation && option.id !== 'copy'}
              className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 transition-opacity`}
            >
              <option.icon className="w-4 h-4 mr-2" />
              {option.name}
            </Button>
          ))}
        </div>

        {/* Native share (if available) */}
        {navigator.share && userLocation && (
          <Button
            onClick={async () => {
              try {
                await navigator.share({
                  title: 'My Location',
                  text: locationText,
                  url: locationUrl
                });
                toast.success('Shared successfully!');
              } catch (err: any) {
                // Only show error if it's not a user cancellation
                if (err.name !== 'AbortError') {
                  console.error('Share failed:', err);
                  toast.error('Share failed', {
                    description: 'Try copying the link instead'
                  });
                }
              }
            }}
            variant="outline"
            className="w-full mt-3"
          >
            <Share2 className="w-4 h-4 mr-2" />
            More Share Options
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
