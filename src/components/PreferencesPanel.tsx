import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  X,
  Check,
  Settings,
  Save,
  RotateCcw,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  interestGroupInfo, 
  infoCardDetails,
  getDefaultPreferences,
  type InterestGroup,
  type InfoCard,
  type UserInfoPreferences 
} from "../utils/userPreferences";
import type { LanguageCode } from "../utils/translations";

interface PreferencesPanelProps {
  currentLanguage: LanguageCode;
  currentPreferences: UserInfoPreferences;
  onClose: () => void;
  onSave: (preferences: UserInfoPreferences) => void;
}

export function PreferencesPanel({ 
  currentLanguage, 
  currentPreferences,
  onClose,
  onSave 
}: PreferencesPanelProps) {
  const [preferences, setPreferences] = useState<UserInfoPreferences>(currentPreferences);
  const [hasChanges, setHasChanges] = useState(false);

  const toggleInterestGroup = (group: InterestGroup) => {
    const newGroups = preferences.interestGroups.includes(group)
      ? preferences.interestGroups.filter(g => g !== group)
      : [...preferences.interestGroups, group];
    
    setPreferences(prev => ({
      ...prev,
      interestGroups: newGroups
    }));
    setHasChanges(true);
  };

  const toggleInfoCard = (card: InfoCard) => {
    const newCards = preferences.enabledCards.includes(card)
      ? preferences.enabledCards.filter(c => c !== card)
      : [...preferences.enabledCards, card];
    
    setPreferences(prev => ({
      ...prev,
      enabledCards: newCards
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(preferences);
    setHasChanges(false);
  };

  const handleReset = () => {
    const defaultPrefs = getDefaultPreferences(preferences.interestGroups);
    setPreferences(defaultPrefs);
    setHasChanges(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh]"
      >
        <Card className="backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
          {/* Header */}
          <CardHeader className="border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                  <Settings className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Information Preferences</CardTitle>
                  <CardDescription>
                    Choose what information you want to see. Select your interest groups and customize displays.
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          {/* Content */}
          <ScrollArea className="h-[calc(90vh-200px)]">
            <CardContent className="p-6 space-y-6">
              {/* Interest Groups */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      I am a... (Select all that apply)
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Your selections will recommend relevant information cards
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(Object.keys(interestGroupInfo) as InterestGroup[]).map((group) => {
                    const info = interestGroupInfo[group];
                    const isSelected = preferences.interestGroups.includes(group);
                    
                    return (
                      <motion.button
                        key={group}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleInterestGroup(group)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-3xl">{info.icon}</span>
                          {isSelected && (
                            <div className="p-1 rounded-full bg-blue-500">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                          {info.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {info.description}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Information Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      Show Me These Cards
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Toggle individual information cards on/off
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset to Defaults
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(Object.keys(infoCardDetails) as InfoCard[]).map((card) => {
                    const info = infoCardDetails[card];
                    const isEnabled = preferences.enabledCards.includes(card);
                    
                    return (
                      <motion.div
                        key={card}
                        whileHover={{ scale: 1.01 }}
                        className={`p-4 rounded-xl border transition-all ${
                          isEnabled
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{info.icon}</span>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-slate-100">
                                {info.name}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {info.description}
                              </div>
                            </div>
                          </div>
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => toggleInfoCard(card)}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Display Options */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Display Options
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      {preferences.compactMode ? (
                        <EyeOff className="h-5 w-5 text-slate-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-500" />
                      )}
                      <div>
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          Compact Mode
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Show minimal information, less visual clutter
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={preferences.compactMode}
                      onCheckedChange={(checked) => {
                        setPreferences(prev => ({ ...prev, compactMode: checked }));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Your Customization
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <div>
                        • {preferences.interestGroups.length} interest group{preferences.interestGroups.length !== 1 ? 's' : ''} selected
                      </div>
                      <div>
                        • {preferences.enabledCards.length} information card{preferences.enabledCards.length !== 1 ? 's' : ''} enabled
                      </div>
                      <div>
                        • {preferences.compactMode ? 'Compact' : 'Detailed'} display mode
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {hasChanges && (
                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700">
                    Unsaved changes
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
