import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Calendar,
  Image as ImageIcon,
  Tag,
  Folder,
  Send,
  Save,
  Globe,
  ExternalLink,
  RotateCcw,
  SlidersHorizontal,
  Search,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Quote,
  Link2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  X,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';

interface WordPressAuthorPanelProps {
  onBackToFeed?: () => void;
}

export const WordPressAuthorPanel: React.FC<WordPressAuthorPanelProps> = ({ onBackToFeed }) => {
  const { news, addNewsArticle, updateNewsArticle, deleteNewsArticle, lang, playTTS } = useApp();

  const [activeView, setActiveView] = useState<'all_posts' | 'editor' | 'categories'>('all_posts');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Filter & Search states in All Posts list
  const [postSearch, setPostSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Quick edit state
  const [quickEditId, setQuickEditId] = useState<string | null>(null);
  const [quickTitleHi, setQuickTitleHi] = useState('');
  const [quickCategory, setQuickCategory] = useState('');
  const [quickStatus, setQuickStatus] = useState<'published' | 'draft'>('published');

  // WordPress Post Editor Form State
  const [formTitleHi, setFormTitleHi] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('नीतियां व एमएसपी (Policy & MSP)');
  const [formSummaryHi, setFormSummaryHi] = useState('');
  const [formSummaryEn, setFormSummaryEn] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formSource, setFormSource] = useState('PIB नई दिल्ली (Press Information Bureau)');
  const [formSourceUrl, setFormSourceUrl] = useState('https://pib.gov.in');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formAuthor, setFormAuthor] = useState('डॉ. आर. के. शर्मा (वरिष्ठ कृषि पत्रकार)');
  const [formAuthorRole, setFormAuthorRole] = useState('मुख्य संपादक (Chief Editor)');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formTags, setFormTags] = useState('एमएसपी, गेहूं, खरीफ, कृषि नीति');
  const [editorToast, setEditorToast] = useState<string | null>(null);

  // Available categories
  const categoriesList = [
    'नीतियां व एमएसपी (Policy & MSP)',
    'इलेक्ट्रिक ट्रैक्टर व मशीनरी (EV Tech)',
    'मौसम व फसल सलाह (Weather Advisory)',
    'खाद व कीटनाशक (Fertilizer & Seeds)',
    'मंडी विश्लेषण (Mandi Intelligence)',
    'सफलता की कहानियां (Farmer Success)',
  ];

  // Quick preset images
  const sampleImages = [
    { label: 'गेहूं / अनाज', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80' },
    { label: 'इलेक्ट्रिक ट्रैक्टर', url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80' },
    { label: 'उर्वरक / खाद', url: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80' },
    { label: 'कृषि ड्रोन', url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80' },
  ];

  // Open editor for New Post
  const handleAddNewPost = () => {
    setEditingPostId(null);
    setFormTitleHi('');
    setFormTitleEn('');
    setFormSlug('');
    setFormCategory('नीतियां व एमएसपी (Policy & MSP)');
    setFormSummaryHi('');
    setFormSummaryEn('');
    setFormContent('');
    setFormSource('PIB नई दिल्ली (Press Information Bureau)');
    setFormSourceUrl('https://pib.gov.in');
    setFormImageUrl('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80');
    setFormAuthor('डॉ. आर. के. शर्मा (वरिष्ठ कृषि पत्रकार)');
    setFormAuthorRole('मुख्य संपादक (Chief Editor)');
    setFormStatus('published');
    setFormTags('एमएसपी, गेहूं, किसान नीति');
    setActiveView('editor');
  };

  // Open editor for Editing Existing Post
  const handleEditPost = (post: NewsArticle) => {
    setEditingPostId(post.id);
    setFormTitleHi(post.titleHi || post.title);
    setFormTitleEn(post.title);
    setFormSlug(post.id);
    setFormCategory(post.category);
    setFormSummaryHi(post.summaryHi || post.summary);
    setFormSummaryEn(post.summary);
    setFormContent(post.content);
    setFormSource(post.source);
    setFormSourceUrl(post.sourceUrl);
    setFormImageUrl(post.imageUrl);
    setFormAuthor(post.author || 'डॉ. आर. के. शर्मा (वरिष्ठ कृषि पत्रकार)');
    setFormAuthorRole(post.authorRole || 'मुख्य संपादक (Chief Editor)');
    setFormStatus(post.status || 'published');
    setFormTags((post.tags || ['कृषि नीति', 'मंडी भाव']).join(', '));
    setActiveView('editor');
  };

  // Quick edit triggers
  const handleStartQuickEdit = (post: NewsArticle) => {
    setQuickEditId(post.id);
    setQuickTitleHi(post.titleHi);
    setQuickCategory(post.category);
    setQuickStatus(post.status || 'published');
  };

  const handleSaveQuickEdit = (id: string) => {
    updateNewsArticle(id, {
      titleHi: quickTitleHi,
      category: quickCategory,
      status: quickStatus,
    });
    setQuickEditId(null);
    showToast('पोस्ट विवरण त्वरित रूप से अपडेट कर दिया गया है!');
  };

  // Save / Publish in Editor
  const handleSavePost = (statusToSave: 'published' | 'draft') => {
    if (!formTitleHi.trim()) {
      alert('कृपया समाचार का शीर्षक दर्ज करें!');
      return;
    }

    const readTimeCalc = `${Math.max(1, Math.ceil(formContent.split(' ').length / 50))} मिनट पठन`;
    const todayDate = new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const parsedTags = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingPostId) {
      // Update existing
      updateNewsArticle(editingPostId, {
        title: formTitleEn || formTitleHi,
        titleHi: formTitleHi,
        category: formCategory,
        summary: formSummaryEn || formSummaryHi,
        summaryHi: formSummaryHi,
        content: formContent,
        source: formSource,
        sourceUrl: formSourceUrl,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        author: formAuthor,
        authorRole: formAuthorRole,
        status: statusToSave,
        tags: parsedTags,
        readTime: readTimeCalc,
      });
      showToast(statusToSave === 'published' ? 'पोस्ट सफलतापूर्वक अपडेट व प्रकाशित हो गई!' : 'ड्राफ्ट सुरक्षित कर लिया गया है!');
    } else {
      // Add new
      addNewsArticle({
        title: formTitleEn || formTitleHi,
        titleHi: formTitleHi,
        category: formCategory,
        date: todayDate,
        readTime: readTimeCalc,
        summary: formSummaryEn || formSummaryHi,
        summaryHi: formSummaryHi,
        content: formContent || formSummaryHi,
        source: formSource,
        sourceUrl: formSourceUrl,
        imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        author: formAuthor,
        authorRole: formAuthorRole,
        status: statusToSave,
        tags: parsedTags,
        viewsCount: 1,
      });
      showToast(statusToSave === 'published' ? 'नया समाचार पोर्टल पर तुरंत लाइव हो गया है!' : 'नया ड्राफ्ट सहेज लिया गया है!');
    }

    setTimeout(() => {
      setActiveView('all_posts');
    }, 1200);
  };

  const showToast = (msg: string) => {
    setEditorToast(msg);
    setTimeout(() => setEditorToast(null), 3000);
  };

  // Word & character stats
  const wordCount = formContent.trim() ? formContent.trim().split(/\s+/).length : 0;
  const charCount = formContent.length;

  // Filtered posts list
  const filteredPosts = news.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.titleHi.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.source.toLowerCase().includes(postSearch.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && (p.status === 'published' || !p.status)) ||
      (statusFilter === 'draft' && p.status === 'draft');
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const publishedCount = news.filter((p) => p.status === 'published' || !p.status).length;
  const draftCount = news.filter((p) => p.status === 'draft').length;

  return (
    <div className="rounded-3xl border border-stone-200 bg-stone-100 shadow-2xl dark:border-stone-800 dark:bg-stone-950 overflow-hidden font-sans">
      {/* 1. WordPress Top Black Bar */}
      <div className="bg-[#1d2327] text-stone-200 px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-stone-700 text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1d2327] font-black text-sm">
              W
            </span>
            <span className="font-bold tracking-wide text-white">EV Kisan Press</span>
            <span className="hidden sm:inline-block rounded-md bg-stone-700 px-1.5 py-0.5 text-[10px] text-amber-300">
              WordPress Author CMS v6.7
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1 border-l border-stone-700 pl-4 text-[11px]">
            <button
              onClick={() => setActiveView('all_posts')}
              className={`px-2 py-1 rounded-sm hover:bg-stone-800 ${activeView === 'all_posts' ? 'text-amber-400 font-bold' : ''}`}
            >
              सभी पोस्ट ({news.length})
            </button>
            <button
              onClick={handleAddNewPost}
              className={`px-2 py-1 rounded-sm hover:bg-stone-800 flex items-center space-x-1 ${activeView === 'editor' && !editingPostId ? 'text-amber-400 font-bold' : ''}`}
            >
              <PlusCircle className="h-3 w-3" />
              <span>नया पोस्ट जोड़ें</span>
            </button>
            <button
              onClick={() => setActiveView('categories')}
              className={`px-2 py-1 rounded-sm hover:bg-stone-800 ${activeView === 'categories' ? 'text-amber-400 font-bold' : ''}`}
            >
              श्रेणियां
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-stone-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>डॉ. आर. के. शर्मा (संपादक)</span>
          </div>

          {onBackToFeed && (
            <button
              onClick={onBackToFeed}
              className="flex items-center space-x-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white transition-colors"
            >
              <Globe className="h-3 w-3" />
              <span>लाइव साइट देखें</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor Toast Alert */}
      {editorToast && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-xs font-bold flex items-center justify-between animate-in slide-in-from-top duration-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{editorToast}</span>
          </div>
          <button onClick={() => setEditorToast(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 2. SUB-BAR: Tab navigation for mobile & quick buttons */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('all_posts')}
            className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
              activeView === 'all_posts'
                ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>सभी समाचार ({news.length})</span>
          </button>

          <button
            onClick={handleAddNewPost}
            className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
              activeView === 'editor' && !editingPostId
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300'
            }`}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>+ नया पोस्ट लिखें (Add New)</span>
          </button>

          <button
            onClick={() => setActiveView('categories')}
            className={`hidden sm:flex items-center space-x-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
              activeView === 'categories'
                ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            <Folder className="h-3.5 w-3.5" />
            <span>श्रेणियां</span>
          </button>
        </div>

        {activeView === 'editor' && (
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              {wordCount} शब्द • {charCount} वर्ण
            </span>
            <button
              onClick={() => handleSavePost('draft')}
              className="flex items-center space-x-1 rounded-xl border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200"
            >
              <Save className="h-3.5 w-3.5" />
              <span>ड्राफ्ट सहेजें</span>
            </button>
            <button
              onClick={() => handleSavePost('published')}
              className="flex items-center space-x-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{editingPostId ? 'अपडेट व प्रकाशित करें' : 'प्रकाशित करें (Publish)'}</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. MAIN BODY CONTAINER */}
      <div className="p-4 sm:p-6">
        {/* VIEW A: ALL POSTS LIST (WordPress WP-List-Table Style) */}
        {activeView === 'all_posts' && (
          <div className="space-y-4">
            {/* Top Filter & Status Counter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2 text-stone-600 dark:text-stone-300">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`hover:underline ${statusFilter === 'all' ? 'font-bold text-emerald-700 dark:text-emerald-400' : ''}`}
                >
                  सभी ({news.length})
                </button>
                <span>|</span>
                <button
                  onClick={() => setStatusFilter('published')}
                  className={`hover:underline ${statusFilter === 'published' ? 'font-bold text-emerald-700 dark:text-emerald-400' : ''}`}
                >
                  प्रकाशित ({publishedCount})
                </button>
                <span>|</span>
                <button
                  onClick={() => setStatusFilter('draft')}
                  className={`hover:underline ${statusFilter === 'draft' ? 'font-bold text-amber-700 dark:text-amber-400' : ''}`}
                >
                  ड्राफ्ट्स ({draftCount})
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
                  <input
                    type="text"
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                    placeholder="शीर्षक या स्रोत खोजें..."
                    className="rounded-xl border border-stone-300 bg-white py-1.5 pl-8 pr-3 text-xs dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                  />
                </div>

                {/* Category select */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-semibold dark:border-stone-700 dark:bg-stone-900 dark:text-white"
                >
                  <option value="all">सभी श्रेणियां (All Categories)</option>
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* WordPress Table */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-stone-200 bg-stone-50 text-[11px] font-black uppercase text-stone-600 dark:border-stone-800 dark:bg-stone-800/80 dark:text-stone-300">
                    <tr>
                      <th className="p-3.5 w-12 text-center">छवि</th>
                      <th className="p-3.5 min-w-[280px]">शीर्षक (Title & Quick Actions)</th>
                      <th className="p-3.5 min-w-[140px]">लेखक (Author)</th>
                      <th className="p-3.5 min-w-[140px]">श्रेणी (Category)</th>
                      <th className="p-3.5 min-w-[100px]">स्थिति (Status)</th>
                      <th className="p-3.5 min-w-[120px]">दिनांक</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                    {filteredPosts.map((post) => {
                      const isQuickEditing = quickEditId === post.id;

                      if (isQuickEditing) {
                        return (
                          <tr key={post.id} className="bg-amber-50/60 dark:bg-amber-950/20">
                            <td colSpan={6} className="p-4 space-y-3">
                              <div className="flex items-center justify-between border-b border-amber-200 pb-2 dark:border-stone-700">
                                <span className="font-bold text-amber-900 dark:text-amber-300 text-xs uppercase">
                                  त्वरित संपादन (Quick Edit)
                                </span>
                                <button
                                  onClick={() => setQuickEditId(null)}
                                  className="text-stone-400 hover:text-stone-700"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2">
                                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                                    शीर्षक (Title)
                                  </label>
                                  <input
                                    type="text"
                                    value={quickTitleHi}
                                    onChange={(e) => setQuickTitleHi(e.target.value)}
                                    className="w-full rounded-lg border border-stone-300 bg-white p-2 text-xs font-bold"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                                    श्रेणी (Category)
                                  </label>
                                  <select
                                    value={quickCategory}
                                    onChange={(e) => setQuickCategory(e.target.value)}
                                    className="w-full rounded-lg border border-stone-300 bg-white p-2 text-xs font-bold"
                                  >
                                    {categoriesList.map((c) => (
                                      <option key={c} value={c}>
                                        {c}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-2">
                                  <label className="text-xs font-bold text-stone-600">स्थिति:</label>
                                  <select
                                    value={quickStatus}
                                    onChange={(e) => setQuickStatus(e.target.value as any)}
                                    className="rounded-lg border p-1 text-xs font-bold bg-white"
                                  >
                                    <option value="published">प्रकाशित (Published)</option>
                                    <option value="draft">ड्राफ्ट (Draft)</option>
                                  </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => setQuickEditId(null)}
                                    className="rounded-lg bg-stone-200 px-3 py-1.5 text-xs font-bold text-stone-700"
                                  >
                                    रद्द करें
                                  </button>
                                  <button
                                    onClick={() => handleSaveQuickEdit(post.id)}
                                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs"
                                  >
                                    अपडेट करें (Save)
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr
                          key={post.id}
                          className="group hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
                        >
                          {/* Thumbnail */}
                          <td className="p-3 text-center align-top">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="h-10 w-14 rounded-lg object-cover border border-stone-200 dark:border-stone-700 mx-auto"
                            />
                          </td>

                          {/* Title & Action Links */}
                          <td className="p-3.5 align-top">
                            <div className="font-bold text-stone-900 dark:text-white line-clamp-2">
                              {post.titleHi || post.title}
                            </div>
                            <div className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                              {post.summaryHi || post.summary}
                            </div>

                            {/* WordPress-style hover action links */}
                            <div className="mt-2 flex items-center space-x-2 text-[11px] font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditPost(post)}
                                className="text-emerald-700 hover:underline dark:text-emerald-400 font-bold"
                              >
                                संपादित करें (Edit)
                              </button>
                              <span className="text-stone-300">|</span>
                              <button
                                onClick={() => handleStartQuickEdit(post)}
                                className="text-stone-600 hover:underline dark:text-stone-300"
                              >
                                त्वरित संपादन (Quick Edit)
                              </button>
                              <span className="text-stone-300">|</span>
                              <button
                                onClick={() => {
                                  if (confirm(`क्या आप वाकई "${post.titleHi}" को हटाना चाहते हैं?`)) {
                                    deleteNewsArticle(post.id);
                                    showToast('पोस्ट को सफलतापूर्वक हटा दिया गया है!');
                                  }
                                }}
                                className="text-rose-600 hover:underline"
                              >
                                ट्रैश (Trash)
                              </button>
                              <span className="text-stone-300">|</span>
                              <button
                                onClick={() =>
                                  playTTS(
                                    `${post.titleHi}। ${post.summaryHi}`,
                                    post.titleHi
                                  )
                                }
                                className="text-amber-600 hover:underline flex items-center space-x-0.5"
                              >
                                <Volume2 className="h-3 w-3" />
                                <span>ऑडियो सुनें</span>
                              </button>
                            </div>
                          </td>

                          {/* Author */}
                          <td className="p-3.5 text-xs text-stone-700 dark:text-stone-300 align-top">
                            <div className="font-semibold">{post.author || 'संपादकीय डेस्क'}</div>
                            <div className="text-[10px] text-stone-400">{post.source}</div>
                          </td>

                          {/* Category */}
                          <td className="p-3.5 align-top">
                            <span className="inline-block rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                              {post.category}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-3.5 align-top">
                            {post.status === 'draft' ? (
                              <span className="inline-flex items-center space-x-1 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                                <Clock className="h-3 w-3" />
                                <span>ड्राफ्ट</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                <CheckCircle2 className="h-3 w-3" />
                                <span>प्रकाशित</span>
                              </span>
                            )}
                          </td>

                          {/* Date */}
                          <td className="p-3.5 text-xs text-stone-500 align-top">
                            <div>{post.date}</div>
                            <div className="text-[10px] text-stone-400">{post.readTime}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW B: WORDPRESS GUTENBERG / CLASSIC POST EDITOR */}
        {activeView === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left 2 Columns: Main Post Content Area */}
            <div className="lg:col-span-2 space-y-5">
              {/* Post Title Block (Devanagari Main Title) */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-stone-500">
                  समाचार शीर्षक (हिंदी) *
                </label>
                <input
                  type="text"
                  required
                  value={formTitleHi}
                  onChange={(e) => setFormTitleHi(e.target.value)}
                  placeholder="समाचार का मुख्य शीर्षक यहां दर्ज करें (उदा. रबी फसलों की एमएसपी में 8% तक की ऐतिहासिक बढ़ोतरी)..."
                  className="w-full text-lg sm:text-xl font-black text-stone-900 placeholder:text-stone-300 focus:outline-hidden dark:bg-stone-900 dark:text-white"
                />

                {/* English Title & Permalink Preview */}
                <div className="border-t border-stone-100 pt-3 dark:border-stone-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-stone-400">
                    <Globe className="h-3.5 w-3.5 text-emerald-600" />
                    <span>पर्मालिंक (Permalink):</span>
                    <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-sm">
                      evkisan.in/news/{formSlug || 'new-post-slug'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-0.5">
                      शीर्षक (English Translation for SEO):
                    </label>
                    <input
                      type="text"
                      value={formTitleEn}
                      onChange={(e) => setFormTitleEn(e.target.value)}
                      placeholder="e.g. Cabinet Approves Historic MSP Hike for Rabi Crops 2026-27"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 p-2 text-xs font-medium dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Rich Formatting Toolbar (Classic WP Editor Bar) */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3">
                <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-100 pb-2.5 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                  <span className="text-xs font-black text-stone-400 mr-2">टूलबार:</span>
                  <button
                    type="button"
                    onClick={() => setFormContent((prev) => prev + '\n**मोटा टेक्स्ट (Bold)**')}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((prev) => prev + '\n*तिरछा टेक्स्ट (Italic)*')}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((prev) => prev + '\n\n## मुख्य उपशीर्षक (Heading 2)\n')}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Heading 2"
                  >
                    <Heading2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((prev) => prev + '\n• पहला बिंदु\n• दूसरा बिंदु\n• तीसरा बिंदु')}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormContent((prev) => prev + '\n> आधिकारिक वक्तव्य या उद्धरण (Quote)\n')}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Blockquote"
                  >
                    <Quote className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const linkUrl = prompt('लिंक वेब पता (URL) दर्ज करें:', 'https://pib.gov.in');
                      if (linkUrl) setFormContent((prev) => `${prev} [विस्तृत सरकारी आदेश देखें](${linkUrl})`);
                    }}
                    className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Insert Link"
                  >
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Main Content Body */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                    समाचार का विस्तृत विवरण (Full Story / Article Content) *
                  </label>
                  <textarea
                    rows={10}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="यहां समाचार का पूरा विवरण, किसानों को होने वाला लाभ, सब्सिडी नियम व दिशानिर्देश लिखें..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-4 text-xs sm:text-sm leading-relaxed focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                  <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                    <span>* पैराग्राफ बनाने के लिए दो बार Enter दबाएं।</span>
                    <span>{wordCount} शब्द</span>
                  </div>
                </div>
              </div>

              {/* Summary / Excerpt Meta Box */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">
                  संक्षिप्त सार (Article Excerpt / Summary)
                </h4>
                <p className="text-[11px] text-stone-400">
                  यह सारांश होमपेज, नोटिफिकेशन और ऑडियो वाचन में किसानों को सुनाया जाएगा।
                </p>
                <textarea
                  rows={3}
                  value={formSummaryHi}
                  onChange={(e) => setFormSummaryHi(e.target.value)}
                  placeholder="2-3 पंक्तियों में मुख्य खबर का सार (उदा. कैबिनेट बैठक में गेहूं एमएसपी ₹2,425 तय, किसानों को प्रति क्विंटल ₹150 का सीधा फायदा)..."
                  className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>
            </div>

            {/* Right 1 Column: WordPress Post Settings Sidebar */}
            <div className="space-y-5">
              {/* Box 1: Publish Settings */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3.5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 dark:border-stone-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                    <Send className="h-3.5 w-3.5 text-emerald-600" />
                    <span>प्रकाशन स्थिति (Publish)</span>
                  </h4>
                  <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold dark:bg-stone-800">
                    {formStatus.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">पोस्ट स्थिति:</span>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="rounded-lg border border-stone-300 p-1 font-bold text-xs bg-stone-50"
                    >
                      <option value="published">सार्वजनिक प्रकाशित (Published)</option>
                      <option value="draft">ड्राफ्ट (Draft - अप्रकाशित)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">दृश्यता (Visibility):</span>
                    <strong className="text-stone-800 dark:text-stone-200">पब्लिक (सभी किसान)</strong>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">पुनरीक्षण (Revisions):</span>
                    <span className="text-emerald-700 font-bold">3 Revisions</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleSavePost('draft')}
                    className="w-1/2 rounded-xl border border-stone-300 bg-stone-100 py-2 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    ड्राफ्ट सहेजें
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSavePost('published')}
                    className="w-1/2 rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2 text-xs font-bold text-white shadow-md transition-colors"
                  >
                    {editingPostId ? 'अपडेट करें' : 'प्रकाशित करें'}
                  </button>
                </div>
              </div>

              {/* Box 2: Category Selector */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                  <Folder className="h-3.5 w-3.5 text-amber-500" />
                  <span>श्रेणी (Categories)</span>
                </h4>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {categoriesList.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-2 text-xs text-stone-700 dark:text-stone-300 cursor-pointer hover:text-emerald-600"
                    >
                      <input
                        type="radio"
                        name="postCategory"
                        checked={formCategory === cat}
                        onChange={() => setFormCategory(cat)}
                        className="accent-emerald-600"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Box 3: Featured Image (विशेष छवि) */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-teal-600" />
                  <span>विशेष मुख्य छवि (Featured Image)</span>
                </h4>

                {formImageUrl && (
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700">
                    <img src={formImageUrl} alt="preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormImageUrl('')}
                      className="absolute top-2 right-2 rounded-full bg-stone-900/80 p-1 text-white hover:bg-rose-600"
                      title="छवि हटाएं"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1">
                    छवि वेब लिंक (Image URL):
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                {/* Preset image buttons */}
                <div>
                  <span className="block text-[10px] font-bold uppercase text-stone-400 mb-1.5">
                    त्वरित छवि चुनें:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {sampleImages.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setFormImageUrl(s.url)}
                        className="rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[11px] font-semibold text-stone-700 hover:border-emerald-600 hover:bg-emerald-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 text-left truncate"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 4: Author & Official Source Attribution */}
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3 text-xs">
                <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 dark:text-white flex items-center space-x-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>लेखक व सरकारी सत्यापन (Attribution)</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                    लेखक का नाम:
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                    आधिकारिक स्रोत (Source):
                  </label>
                  <input
                    type="text"
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    placeholder="उदा. PIB नई दिल्ली / कृषि मंत्रालय"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                    स्रोत लिंक (Source URL):
                  </label>
                  <input
                    type="url"
                    value={formSourceUrl}
                    onChange={(e) => setFormSourceUrl(e.target.value)}
                    placeholder="https://pib.gov.in"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                    टैग्स (अल्पविराम से अलग):
                  </label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="एमएसपी, गेहूं, खाद, सब्सिडी"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: CATEGORIES MANAGEMENT */}
        {activeView === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4">
              <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
                मौजूदा समाचार श्रेणियां (News Categories)
              </h3>
              <div className="space-y-2">
                {categoriesList.map((cat, idx) => {
                  const count = news.filter((p) => p.category === cat).length;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-stone-50 p-3 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700 text-xs"
                    >
                      <div className="font-bold text-stone-800 dark:text-stone-200 flex items-center space-x-2">
                        <Folder className="h-4 w-4 text-emerald-600" />
                        <span>{cat}</span>
                      </div>
                      <span className="rounded-md bg-stone-200 px-2 py-0.5 font-bold text-stone-700 dark:bg-stone-700 dark:text-stone-200">
                        {count} पोस्ट्स
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4">
              <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
                संपादकीय नियम व पत्रकारिता दिशानिर्देश
              </h3>
              <ul className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>सभी सरकारी घोषणाओं और एमएसपी निर्णयों के लिए पत्र सूचना कार्यालय (PIB) या कृषि मंत्रालय का आधिकारिक लिंक अवश्य दें।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>शीर्षक सरल और स्पष्ट हिंदी में रखें ताकि किसान भाई आसानी से पढ़कर समझ सकें।</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>ड्राफ्ट विकल्प का उपयोग तब करें जब तथ्य की पुष्टि प्रतीक्षित हो। पुष्टि के बाद ही 'प्रकाशित करें' दबाएं।</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
