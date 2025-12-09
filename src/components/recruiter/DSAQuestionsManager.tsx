"use client";

import { useState, useEffect } from "react";
import { DSAQuestion } from "@/lib/types";
import { MockDB } from "@/lib/mock-db";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
    Plus, 
    Edit, 
    Trash2, 
    Save, 
    X, 
    Clock, 
    Code, 
    Lightbulb,
    CheckCircle,
    Loader2,
    Eye
} from "lucide-react";

interface DSAQuestionsManagerProps {
    companyId: string;
    recruiterId: string;
}

export function DSAQuestionsManager({ companyId, recruiterId }: DSAQuestionsManagerProps) {
    const [questions, setQuestions] = useState<DSAQuestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState<Partial<DSAQuestion>>({
        title: "",
        description: "",
        difficulty: "Easy",
        timeLimit: 30,
        hints: [""],
        testCases: [{ input: "", expectedOutput: "", isHidden: false }],
        starterCode: { javascript: "", python: "", java: "" },
        tags: []
    });

    useEffect(() => {
        loadQuestions();
    }, [companyId]);

    const loadQuestions = async () => {
        setLoading(true);
        const data = await MockDB.getDSAQuestions(companyId);
        setQuestions(data);
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (editingId) {
                await MockDB.updateDSAQuestion(editingId, formData);
            } else {
                await MockDB.createDSAQuestion({
                    ...formData as Omit<DSAQuestion, 'id' | 'createdAt'>,
                    companyId,
                    createdBy: recruiterId
                });
            }
            
            await loadQuestions();
            resetForm();
        } catch (error) {
            console.error("Failed to save question", error);
            alert("Failed to save question");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (question: DSAQuestion) => {
        setFormData(question);
        setEditingId(question.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this question?")) return;
        
        try {
            await MockDB.deleteDSAQuestion(id);
            await loadQuestions();
        } catch (error) {
            console.error("Failed to delete question", error);
            alert("Failed to delete question");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            difficulty: "Easy",
            timeLimit: 30,
            hints: [""],
            testCases: [{ input: "", expectedOutput: "", isHidden: false }],
            starterCode: { javascript: "", python: "", java: "" },
            tags: []
        });
        setEditingId(null);
        setShowForm(false);
    };

    const addHint = () => {
        setFormData({
            ...formData,
            hints: [...(formData.hints || []), ""]
        });
    };

    const updateHint = (index: number, value: string) => {
        const newHints = [...(formData.hints || [])];
        newHints[index] = value;
        setFormData({ ...formData, hints: newHints });
    };

    const removeHint = (index: number) => {
        setFormData({
            ...formData,
            hints: (formData.hints || []).filter((_, i) => i !== index)
        });
    };

    const addTestCase = () => {
        setFormData({
            ...formData,
            testCases: [...(formData.testCases || []), { input: "", expectedOutput: "", isHidden: false }]
        });
    };

    const updateTestCase = (index: number, field: string, value: string | boolean) => {
        const newTestCases = [...(formData.testCases || [])];
        newTestCases[index] = { ...newTestCases[index], [field]: value };
        setFormData({ ...formData, testCases: newTestCases });
    };

    const removeTestCase = (index: number) => {
        setFormData({
            ...formData,
            testCases: (formData.testCases || []).filter((_, i) => i !== index)
        });
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">DSA Questions ({questions.length})</h2>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" /> Add New Question
                </Button>
            </div>

            {/* Question Form */}
            {showForm && (
                <div className="bg-white rounded-xl border p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">
                            {editingId ? "Edit Question" : "Create New Question"}
                        </h3>
                        <Button variant="ghost" size="sm" onClick={resetForm}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Question Title</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., Two Sum"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                                    className="w-full rounded-md border p-2 text-sm"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full rounded-md border p-3 text-sm min-h-[150px]"
                                placeholder="Describe the problem..."
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    Time Limit (minutes)
                                </label>
                                <Input
                                    type="number"
                                    value={formData.timeLimit}
                                    onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                                    min="5"
                                    max="180"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tags (comma-separated)</label>
                                <Input
                                    value={formData.tags?.join(", ")}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
                                    placeholder="Array, Hash Table, Two Pointers"
                                />
                            </div>
                        </div>

                        {/* Hints */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4" />
                                    Hints
                                </label>
                                <Button type="button" size="sm" variant="outline" onClick={addHint}>
                                    <Plus className="h-3 w-3 mr-1" /> Add Hint
                                </Button>
                            </div>
                            {formData.hints?.map((hint, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={hint}
                                        onChange={(e) => updateHint(index, e.target.value)}
                                        placeholder={`Hint ${index + 1}`}
                                    />
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeHint(index)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* Test Cases */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Test Cases
                                </label>
                                <Button type="button" size="sm" variant="outline" onClick={addTestCase}>
                                    <Plus className="h-3 w-3 mr-1" /> Add Test Case
                                </Button>
                            </div>
                            {formData.testCases?.map((testCase, index) => (
                                <div key={index} className="border rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Test Case {index + 1}</span>
                                        <div className="flex items-center gap-2">
                                            <label className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={testCase.isHidden}
                                                    onChange={(e) => updateTestCase(index, 'isHidden', e.target.checked)}
                                                />
                                                Hidden
                                            </label>
                                            <Button type="button" variant="ghost" size="sm" onClick={() => removeTestCase(index)}>
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-600">Input</label>
                                            <Input
                                                value={testCase.input}
                                                onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                                                placeholder="[2,7,11,15], 9"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-slate-600">Expected Output</label>
                                            <Input
                                                value={testCase.expectedOutput}
                                                onChange={(e) => updateTestCase(index, 'expectedOutput', e.target.value)}
                                                placeholder="[0,1]"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Starter Code */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                Starter Code (Optional)
                            </label>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-600">JavaScript</label>
                                    <textarea
                                        value={formData.starterCode?.javascript}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            starterCode: { ...formData.starterCode, javascript: e.target.value }
                                        })}
                                        className="w-full rounded-md border p-3 text-sm font-mono min-h-[100px]"
                                        placeholder="function twoSum(nums, target) { ... }"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs text-slate-600">Python</label>
                                    <textarea
                                        value={formData.starterCode?.python}
                                        onChange={(e) => setFormData({ 
                                            ...formData, 
                                            starterCode: { ...formData.starterCode, python: e.target.value }
                                        })}
                                        className="w-full rounded-md border p-3 text-sm font-mono min-h-[100px]"
                                        placeholder="def twoSum(nums, target): ..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-3 pt-4 border-t">
                            <Button type="button" variant="ghost" onClick={resetForm}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={saving} className="gap-2">
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                {editingId ? "Update Question" : "Create Question"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Questions List */}
            <div className="grid gap-4">
                {questions.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-xl border">
                        <Code className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-600">No DSA questions yet. Create your first one!</p>
                    </div>
                ) : (
                    questions.map((question) => (
                        <div key={question.id} className="bg-white rounded-lg border p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-lg">{question.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(question.difficulty)}`}>
                                            {question.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-2">{question.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {question.timeLimit} min
                                        </span>
                                        <span>{question.testCases.length} test cases</span>
                                        <span>{question.hints.length} hints</span>
                                    </div>
                                    {question.tags && question.tags.length > 0 && (
                                        <div className="flex gap-2 mt-3">
                                            {question.tags.map((tag, idx) => (
                                                <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => window.open(`/dsa-test?questionId=${question.id}&candidateId=preview`, '_blank')}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(question)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDelete(question.id)}>
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
