<?php

define('MAIL_INQUIRY', 'kazumatakanashi1120@gmail.com');
session_start();

if ($_SERVER['REQUEST_METHOD'] === "POST") {

  // CSRF対策
  if (!isset($_POST['token']) || $_POST['token'] !== getToken()) {
    exit('処理を正常に完了できませんでした。');
  }

  //バリデーション
  $inquiry = $_POST['inquiry'];
  $name = $_POST['name'];
  $email = $_POST['email'];
  $error = array(); //配列セット

  if(empty($inquiry)) {
    $error['inquiry'] = '必ずご記入ください。';
  }
  if(empty($name)) {
    $error['name'] = '必ずご記入ください。';
  }
  if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // 注意: FILTER_VALIDATE_EMAIL は一部の有効なメールも弾きます。
    // 案件次第では正規表現の使用も必要です。
    $error['email'] = 'メールアドレスの形式が正しくありません。';
  }

  if (empty($error)) { //エラーが空だったら問題なし,問題がありの場合はindex.phpでエラー文言
    $to      = MAIL_INQUIRY;
    $subject = "お問い合わせ" . $name . '様より';
    $message = "email:\n" . $email . "\n問い合わせ本文\n" . $inquiry;
    mb_language('Japanese');
    mb_internal_encoding('UTF-8');
    $flg = mb_send_mail($to, $subject, $message);

    if ($flg) {
      header('Location: thanks.html'); //Locationで指定したページへ飛ぶ (dtue)
      exit;
    }
    exit('お問い合わせの受付に失敗しました。'); // (false)
  }

} //$_SERVER閉じ


/*======
HTMLの特殊文字をエスケープして返す
  ======*/
function h($sdt) {
  return htmlspecialchars($sdt, ENT_QUOTES, 'UTF-8');
}

/*======
  CSRF対策用 トークンを取得
  ======*/
  function getToken() {
    return hash('sha256', session_id());
    //session_idを元にsha256暗号化,解読不可能
  }

?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact</title>
  <link rel="stylesheet" href="style.css">
  <link rel="shortcut icon" href="favicon.ico"/>
</head>
<body>
  <div id="wrap">
  <h2>お問い合わせフォーム</h2>
  <p>御意見、御感想、御依頼など、どんなことでも構いません。<br>御連絡を心よりお待ちしております。</p>
  <form action="" method="post">
  <dl>
    <dt><th>お名前</th><input type="hidden" name="token" value="<?php echo getToken(); ?>">
    <?php if(isset($error['name'])) echo h($error['name']); ?>
    <dd><input type="text" name="name" required value="<?php if (isset($name)) echo h($name); ?>" placeholder="お名前"></dd></dt>

    <dt><th>ご連絡用email<br><span class="required">※必須</span></th>
    <?php if (isset($error['email'])) echo h($error['email']); ?>
    <dd><input type="email" name="email" required value="<?php if (isset($email)) echo h($email); ?>" placeholder="email@example.com"></dd></dt>

    <dt><th>お問い合わせ<br><span class="required">※必須</span></th>
    <?php if(isset($error['inquiry'])) echo h($error['inquiry']); ?>
    <dd><textarea name="inquiry" required cols="50" rows="10" maxlength="1000" minlength="10" placeholder="お気軽にお問い合わせください(10文字以上 1000文字以内)"><?php if (isset($inquiry)) echo h($inquiry); ?></textarea></dd></dt>

  </dl>
  <p class="submit"><button type="submit" class="btn">送信</button></p>


  <p class="home"><a href="http://felica7.webcrow.jp/portfolio/">Back Home</a></p>
  </div>
  <!-- /#wrap -->
  </form>
</body>
</html>
