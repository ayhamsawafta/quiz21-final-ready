import React, { useMemo, useState } from "react";
import "./index.css";

const questions = [
  {
    unit: "المعجم العربي",
    question: "ما المقصود بالمعجم اصطلاحًا؟",
    options: [
      "كتاب يضم مفردات اللغة ويشرح معانيها وفق نظام معيّن",
      "كتاب يروي القصص التاريخية فقط",
      "كتاب خاص بالقواعد النحوية فقط",
      "كتاب يشرح الشعر فقط",
    ],
    answer: 0,
    explain: "المعجم مرجع لغوي يجمع الكلمات ويبيّن معانيها بطريقة مرتبة.",
  },
  {
    unit: "المعجم العربي",
    question: "لماذا سُمّي المعجم بهذا الاسم؟",
    options: [
      "لأنه يزيد غموض الكلمات",
      "لأنه يزيل الغموض عن الكلمات ويوضح معانيها",
      "لأنه يضم القصائد فقط",
      "لأنه لا يعتمد على ترتيب",
    ],
    answer: 1,
    explain: "الفعل أعجم يدل هنا على إزالة العجمة والغموض.",
  },
  {
    unit: "المعجم العربي",
    question: "أي مما يأتي من فوائد استخدام المعجم؟",
    options: [
      "معرفة معاني الكلمات وأصولها",
      "حفظ النصوص دون فهم",
      "تغيير معاني الكلمات",
      "إلغاء الحاجة إلى القراءة",
    ],
    answer: 0,
    explain: "نستخدم المعجم لفهم المعنى الدقيق ومعرفة الجذر والاستخدام.",
  },
  {
    unit: "مدارس المعاجم",
    question: "ما المقصود بمدارس المعاجم؟",
    options: [
      "طرق مختلفة لترتيب الكلمات في المعاجم",
      "مدارس لتعليم الخط العربي",
      "أنواع من الشعر العربي",
      "قواعد إعراب فقط",
    ],
    answer: 0,
    explain: "كل مدرسة معجمية لها طريقة خاصة في تنظيم الكلمات والبحث عنها.",
  },
  {
    unit: "مدارس المعاجم",
    question: "على ماذا تعتمد المدرسة الصوتية في ترتيب الكلمات؟",
    options: [
      "الترتيب الأبجدي فقط",
      "مخارج الحروف",
      "عدد حروف الكلمة",
      "آخر حرف في الكلمة دائمًا",
    ],
    answer: 1,
    explain: "المدرسة الصوتية ترتب الحروف بحسب مخارجها، وتبدأ بالحروف الحلقية.",
  },
  {
    unit: "مدارس المعاجم",
    question: "من أشهر من ارتبطت به المدرسة الصوتية؟",
    options: ["الخليل بن أحمد الفراهيدي", "المتنبي", "أبو تمام", "ابن خلدون"],
    answer: 0,
    explain: "الخليل بن أحمد الفراهيدي هو صاحب معجم العين، وهو مرتبط بالمنهج الصوتي.",
  },
  {
    unit: "مدارس المعاجم",
    question: "ما فكرة مدرسة التقاليب؟",
    options: [
      "ترتيب الكلمات حسب أول حرف كما هي",
      "تغيير ترتيب حروف الجذر وجمع احتمالاته",
      "شرح الصور الموجودة في الكتاب",
      "ترتيب الكلمات حسب عدد الأسطر",
    ],
    answer: 1,
    explain: "التقاليب تعني توليد احتمالات ترتيب حروف الجذر مثل: كتب، كبت، تكب...",
  },
  {
    unit: "مدارس المعاجم",
    question: "كم عدد التقاليب الممكنة لجذر ثلاثي مثل: كتب؟",
    options: ["3", "4", "6", "9"],
    answer: 2,
    explain: "عدد التقاليب لكلمة من ثلاثة أحرف مختلفة هو: 3 × 2 × 1 = 6.",
  },
  {
    unit: "مدارس المعاجم",
    question: "في المدرسة الألفبائية، كلمة 'مكتبة' نبحث عنها تحت أي حرف؟",
    options: ["ك", "ت", "ب", "م"],
    answer: 3,
    explain: "الألفبائية تعتمد على الكلمة كما هي؛ لذلك نبحث تحت أول حرف: م.",
  },
  {
    unit: "مدارس المعاجم",
    question: "في معجم يعتمد على الجذر، كلمة 'مكتبة' نبحث عنها تحت أي حرف؟",
    options: ["م", "ك", "ت", "ة"],
    answer: 1,
    explain: "نرجع الكلمة إلى جذرها: كتب، فنبحث تحت الكاف.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'مستخرج'؟",
    options: ["خرج", "سخرج", "مخرج", "درج"],
    answer: 0,
    explain: "نحذف الزوائد مثل م، س، ت، فيبقى الجذر: خرج.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "في المدرسة الألفبائية، كلمة 'استخراج' نبحث عنها تحت حرف:",
    options: ["خ", "ر", "ج", "ا"],
    answer: 3,
    explain: "في الألفبائية نأخذ الكلمة كما هي؛ أول حرف هو الألف.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "في معجم الجذر، كلمة 'استخراج' نبحث عنها تحت حرف:",
    options: ["ا", "س", "خ", "ر"],
    answer: 2,
    explain: "الجذر هو خرج، فنبحث تحت الخاء.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'دراسة'؟",
    options: ["درس", "دار", "دسر", "رسم"],
    answer: 0,
    explain: "نحذف الزوائد ونرجع الكلمة إلى أصلها: درس.",
  },
  {
    unit: "الجذر والبحث المعجمي",
    question: "ما جذر كلمة 'استغفار'؟",
    options: ["سفر", "غفر", "غفا", "غار"],
    answer: 1,
    explain: "استغفار من الجذر: غفر.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما الفكرة العامة في النص الذي يتحدث عن الدنيا؟",
    options: [
      "الدنيا ثابتة لا تتغير",
      "الدنيا زائلة ومتغيرة ولا تبقى على حال",
      "المال يبقى إلى الأبد",
      "القوة تمنع الموت",
    ],
    answer: 1,
    explain: "الفكرة العامة أن الحياة الدنيا محكومة بالتغير والفناء.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما المقصود بقولنا إن الدنيا 'لا تبقى على حال'؟",
    options: [
      "أن أحوال الناس تتغير من قوة إلى ضعف ومن غنى إلى فقر",
      "أن كل الناس يبقون أغنياء",
      "أن الزمن يتوقف",
      "أن الملوك لا يزولون",
    ],
    answer: 0,
    explain: "المقصود أن أحوال الدنيا متبدلة وليست ثابتة.",
  },
  {
    unit: "الأدب: الدنيا والزوال",
    question: "ما العبرة من ذكر زوال الممالك والحضارات؟",
    options: ["التفاخر بالقوة", "التأكيد أن كل شيء في الدنيا زائل", "إنكار التاريخ", "الدعوة إلى ترك العلم"],
    answer: 1,
    explain: "ذكر الزوال يعلّم الإنسان عدم الاغترار بالدنيا وقوتها.",
  },
  {
    unit: "الأندلس",
    question: "ما الشعور البارز في النص المتعلق بسقوط الأندلس؟",
    options: ["الفرح", "الشماتة", "الحزن والتحسر", "اللامبالاة"],
    answer: 2,
    explain: "النص يصور الحزن الشديد على سقوط الأندلس وتغير حال أهلها.",
  },
  {
    unit: "الأندلس",
    question: "ما دلالة بكاء المساجد والمحاريب في نص الأندلس؟",
    options: ["تصوير شدة المصيبة والحزن", "وصف الطقس", "الدلالة على الفرح", "ذكر أسماء المدن فقط"],
    answer: 0,
    explain: "هذا تصوير بلاغي يبرز عظم المصيبة بعد سقوط الأندلس.",
  },
  {
    unit: "الأندلس",
    question: "ماذا حدث لحال المسلمين بعد سقوط الأندلس كما يصوره النص؟",
    options: ["ازدادوا قوة وسلطانًا", "تحولوا من العزة إلى الذل والهوان", "لم يتغير حالهم", "أصبحوا ملوكًا على الإسبان"],
    answer: 1,
    explain: "النص يبرز انقلاب الحال من القوة والعزة إلى الضعف والذل.",
  },
  {
    unit: "الأندلس",
    question: "أي من الآتي يُعد من مظاهر المأساة في نص الأندلس؟",
    options: ["تفريق الأطفال عن أمهاتهم", "ازدهار الأسواق", "فرح الناس بالفتح", "عودة المدن إلى قوتها"],
    answer: 0,
    explain: "من الصور المؤلمة في النص: التفريق، التشريد، وانتهاك الحرمات.",
  },
  {
    unit: "بلاغة",
    question: "في قول الشاعر إن المساجد تبكي، ما الصورة البلاغية الأقرب؟",
    options: ["تشخيص؛ إذ جعل الجماد كائنًا يبكي", "طباق فقط", "جناس ناقص", "حذف"],
    answer: 0,
    explain: "إسناد البكاء إلى المساجد تشخيص؛ جعل غير العاقل كالعاقل.",
  },
  {
    unit: "بلاغة",
    question: "ما وظيفة الطباق غالبًا في النصوص؟",
    options: ["إبراز المعنى بتقابل الألفاظ", "إخفاء المعنى", "تكرار الحروف بلا فائدة", "تحويل الشعر إلى نثر"],
    answer: 0,
    explain: "الطباق بين معنيين متضادين يقوي المعنى ويوضحه.",
  },
  {
    unit: "الإعراب",
    question: "الفعل المضارع المرفوع تكون علامة رفعه الأصلية:",
    options: ["الفتحة", "الكسرة", "الضمة", "السكون"],
    answer: 2,
    explain: "الأصل في رفع الفعل المضارع الصحيح الآخر هو الضمة.",
  },
  {
    unit: "الإعراب",
    question: "كان وأخواتها تدخل على الجملة الاسمية فترفع:",
    options: ["الخبر", "المبتدأ ويسمى اسمها", "المفعول به", "النعت"],
    answer: 1,
    explain: "كان ترفع الاسم وتنصب الخبر.",
  },
  {
    unit: "الإعراب",
    question: "خبر كان يكون:",
    options: ["مرفوعًا", "مجزومًا", "منصوبًا", "مجرورًا دائمًا"],
    answer: 2,
    explain: "كان وأخواتها تنصب الخبر.",
  },
  {
    unit: "سورة القصص",
    question: "ما الموضوع العام للآيات المختارة من سورة القصص في الكتاب؟",
    options: ["مشاهد من طفولة موسى عليه السلام ورعاية الله له", "غزوة بدر", "قصة أصحاب الكهف", "أحكام البيع والشراء"],
    answer: 0,
    explain: "الآيات تعرض جانبًا من طفولة موسى عليه السلام منذ إلقائه في اليم حتى عودته إلى أمه.",
  },
  {
    unit: "سورة القصص",
    question: "ما الهدف الإيماني البارز من قصة موسى في هذه الآيات؟",
    options: ["إظهار أن تدبير الله غالب رغم ضعف الأسباب الظاهرة", "إظهار قوة فرعون المطلقة", "الدعوة إلى اليأس", "الاكتفاء بوصف المكان"],
    answer: 0,
    explain: "القصة تبين لطف الله وتدبيره ونصره للمستضعفين.",
  },
  {
    unit: "سورة القصص",
    question: "لماذا كانت أم موسى خائفة عليه؟",
    options: ["لخطر فرعون وجنوده على أبناء بني إسرائيل", "لأنه أراد السفر للتجارة", "لأنه كان مريضًا فقط", "لأنه ضاع في السوق"],
    answer: 0,
    explain: "السياق يتعلق ببطش فرعون ببني إسرائيل وخوف الأم على ابنها.",
  },
  {
    unit: "سورة القصص",
    question: "ما دلالة عودة موسى إلى أمه؟",
    options: ["تحقق وعد الله وطمأنة قلبها", "انقطاع الأمل", "انتصار فرعون", "نهاية القصة دون معنى"],
    answer: 0,
    explain: "عودة موسى إلى أمه علامة على صدق وعد الله ولطفه بها.",
  },
];

const uniqueUnits = ["الكل", ...Array.from(new Set(questions.map((q) => q.unit)))];

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState("الكل");
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const unitOk = selectedUnit === "الكل" || q.unit === selectedUnit;
      const searchOk = !query.trim() || `${q.question} ${q.unit}`.includes(query.trim());
      return unitOk && searchOk;
    });
  }, [selectedUnit, query]);

  const q = filtered[current] || filtered[0];
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter((item, index) => answers[index] === item.answer).length;
  const percentage = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const originalIndex = q ? questions.indexOf(q) : -1;
  const selected = originalIndex >= 0 ? answers[originalIndex] : undefined;

  function chooseAnswer(optionIndex) {
    if (originalIndex < 0 || selected !== undefined) return;
    setAnswers((prev) => ({ ...prev, [originalIndex]: optionIndex }));
  }

  function resetQuiz() {
    setAnswers({});
    setCurrent(0);
    setSelectedUnit("الكل");
    setQuery("");
  }

  function nextQuestion() {
    setCurrent((prev) => Math.min(prev + 1, filtered.length - 1));
  }

  function previousQuestion() {
    setCurrent((prev) => Math.max(prev - 1, 0));
  }

  return (
    <main dir="rtl" className="page">
      <section className="hero">
        <div className="titleCard">
          <div className="book">📘</div>
          <div>
            <h1>كويز اللغة العربية</h1>
            <p>اختبر نفسك سؤال بسؤال مع تصحيح فوري وشرح مختصر.</p>
          </div>
        </div>

        <div className="scoreCard">
          <div className="trophy">🏆</div>
          <div>
            <p>نتيجتك الحالية</p>
            <h2>{percentage}%</h2>
          </div>
          <div className="stats">
            <div><strong>{answeredCount}</strong><span>أجبت</span></div>
            <div><strong>{correctCount}</strong><span>صحيح</span></div>
            <div><strong>{questions.length}</strong><span>كل الأسئلة</span></div>
          </div>
          <button className="reset" onClick={resetQuiz}>↻ إعادة الاختبار</button>
        </div>
      </section>

      <section className="filters">
        <div className="units">
          {uniqueUnits.map((unit) => (
            <button
              key={unit}
              onClick={() => { setSelectedUnit(unit); setCurrent(0); }}
              className={selectedUnit === unit ? "active" : ""}
            >
              {unit}
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCurrent(0); }}
          placeholder="ابحث عن سؤال أو وحدة..."
        />
      </section>

      {q ? (
        <section className="questionCard">
          <div className="questionTop">
            <span>{q.unit}</span>
            <small>سؤال {current + 1} من {filtered.length}</small>
          </div>

          <h3>{q.question}</h3>

          <div className="options">
            {q.options.map((option, index) => {
              const isChosen = selected === index;
              const isCorrect = q.answer === index;
              const showCorrect = selected !== undefined && isCorrect;
              const showWrong = selected !== undefined && isChosen && !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => chooseAnswer(index)}
                  className={showCorrect ? "correct" : showWrong ? "wrong" : ""}
                >
                  <span>{option}</span>
                  <b>{showCorrect ? "✅" : showWrong ? "❌" : ""}</b>
                </button>
              );
            })}
          </div>

          {selected !== undefined && (
            <div className={selected === q.answer ? "explain good" : "explain bad"}>
              <strong>{selected === q.answer ? "إجابة صحيحة ✅" : "إجابة خاطئة ❌"}</strong>
              <p>{q.explain}</p>
            </div>
          )}

          <div className="nav">
            <button onClick={previousQuestion} disabled={current === 0}>السابق</button>
            <button onClick={nextQuestion} disabled={current >= filtered.length - 1}>السؤال التالي ←</button>
          </div>
        </section>
      ) : (
        <section className="empty">لا توجد أسئلة مطابقة للبحث.</section>
      )}
    </main>
  );
}
