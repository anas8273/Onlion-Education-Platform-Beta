<?php
// تعيين معلومات الاتصال بقاعدة البيانات
$host = 'localhost';
$db_name = 'course_db';
$user_name = 'root';
$user_password = '';

$dsn = "mysql:host=$host;dbname=$db_name";

// بدء الجلسة إذا لم تكن قد بدأت بالفعل
session_start();

// تحديث وقت آخر نشاط للمستخدم في كل مرة يتفاعل فيها مع الصفحة
$_SESSION['last_activity'] = time();

// تحديد وقت الجلسة القصوى (بالثواني)
$max_session_time = 30;

// التحقق مما إذا كانت المدة الماضية منذ آخر نشاط تجاوزت الحد الأقصى
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $max_session_time) {
    // إذا تجاوز وقت الجلسة القصوى، نقوم بتفريغ البيانات المخزنة في الجلسة وإنهاء الجلسة
    session_unset();
    session_destroy();
    // يمكنك توجيه المستخدم إلى أي صفحة ترغب فيها بعد انتهاء الجلسة
    header("Location: login.php");
    exit;
}

// محاولة الاتصال بقاعدة البيانات
try {
    $conn = new PDO($dsn, $user_name, $user_password);
    // أي شيء إضافي يمكن إضافته هنا عند نجاح الاتصال
} catch (PDOException $e) {
    die("Failed to connect to database: " . $e->getMessage());
}

// توليد مُعرّف فريد
function unique_id($length = 20) {
    $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $id = '';
    $characters_length = strlen($characters);
    for ($i = 0; $i < $length; $i++) {
        $id .= $characters[rand(0, $characters_length - 1)];
    }
    return $id;
}

// تنقيح البيانات المدخلة من المستخدم لتجنب الثغرات الأمنية
function sanitize_input($input) {
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
}

// يمكنك استخدام $conn لتنفيذ استعلامات قاعدة البيانات الخاصة بك
?>
