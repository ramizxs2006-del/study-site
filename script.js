// --- نظام الحفظ التلقائي في الموقع (LocalStorage) ---

// 1. تحميل البيانات عند فتح الموقع لأول مرة
document.addEventListener("DOMContentLoaded", () => {
  loadAppData();
});

// كائن البيانات الأساسي
let appData = {
  xp: 0,
  level: 1,
  studyTime: 0,
  tasks: []
};

// دالة جلب وقراءة البيانات من المتصفح
function loadAppData() {
  const saved = localStorage.getItem("studyAppData");
  if (saved) {
    appData = JSON.parse(saved);
    updateUI(); // تحديث الواجهة بالبيانات المحفوظة
  }
}

// دالة حفظ البيانات في المتصفح
function saveAppData() {
  localStorage.setItem("studyAppData", JSON.stringify(appData));
}

// 2. دالة لإضافة مهمة جديدة وحفظها
function addNewTask(taskText, taskDuration) {
  const newTask = {
    id: Date.now(),
    text: taskText,
    duration: taskDuration,
    completed: false
  };
  
  appData.tasks.push(newTask);
  saveAppData(); // حفظ التغيير فوراً
  updateUI();
}

// 3. دالة لحذف مهمة
function deleteTask(taskId) {
  appData.tasks = appData.tasks.filter(task => task.id !== taskId);
  saveAppData();
  updateUI();
}

// 4. دالة لإضافة نقاط XP وتحديث المستوى
function addXP(amount) {
  appData.xp += amount;
  // كل 100 نقطة يصعد لفل جديد
  appData.level = Math.floor(appData.xp / 100) + 1;
  saveAppData();
  updateUI();
}

// 5. دالة تحديث الواجهة (ربط البيانات بالشاشات)
function updateUI() {
  // يمكنك هنا تحديث النصوص في الـ HTML إذا كنت ترتبط بعناصر معينة
  console.log("تم تحديث البيانات وحفظها بنجاح:", appData);
}
