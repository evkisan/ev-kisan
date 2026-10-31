import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Clock,
  Users,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrainingCourse } from '../types';

export const AgriculturalTrainingPage: React.FC = () => {
  const { courses, lang, playTTS } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const handleEnroll = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setEnrolledSuccess(true);
    playTTS(
      `बधाई! आपने ${course.titleHi} में सफलतापूर्वक पंजीकरण किया है।`,
      'कोर्स पंजीकरण'
    );
    setTimeout(() => {
      setEnrolledSuccess(false);
      setSelectedCourse(null);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'कौशल विकास व कृषि उद्यमिता' : 'Agri-Skill Development'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi'
              ? 'कृषि प्रशिक्षण, ड्रोन पायलट व जैविक कोर्स'
              : 'Agri Training & Certified Courses'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'डीजीसीए प्रमाणित कृषि ड्रोन पायलट कोर्स, जैविक खेती व ड्रिप ऑटोमेशन की विशेषज्ञ ट्रेनिंग। सरकारी मान्यता प्राप्त प्रमाणपत्र सहित।'
              : 'Upskill with certified drone piloting, high-tech polyhouse management, and bio-fertilizer production.'}
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img src={c.imageUrl} alt={c.title} className="h-full w-full object-cover" />
                <span className="absolute top-3 left-3 rounded-lg bg-purple-700 px-2 py-0.5 text-xs font-black text-white uppercase">
                  {c.mode}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-stone-400" />
                    <span>{c.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="h-3.5 w-3.5 text-stone-400" />
                    <span>{c.enrolledCount} नामांकित</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-stone-900 dark:text-white line-clamp-2">
                  {lang === 'hi' ? c.titleHi : c.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                  {c.description}
                </p>

                <div className="text-xs text-stone-500">
                  <strong>प्रशिक्षक:</strong> {c.instructor}
                </div>

                {/* Syllabus preview */}
                <div className="rounded-xl bg-stone-50 p-3 text-xs dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700">
                  <strong className="block text-[10px] font-bold uppercase text-stone-500 mb-1">
                    पाठ्यक्रम विषय (Syllabus):
                  </strong>
                  <ul className="space-y-1 text-stone-600 dark:text-stone-300 text-[11px]">
                    {c.syllabus.slice(0, 3).map((s, idx) => (
                      <li key={idx} className="truncate">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 block font-bold uppercase">फीस</span>
                <span className="text-sm font-black text-emerald-700 dark:text-amber-400">{c.fees}</span>
              </div>
              <button
                onClick={() => handleEnroll(c)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
              >
                {lang === 'hi' ? 'अभी रजिस्टर करें' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
