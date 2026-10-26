let questions = [
  { word: "apple", hint: "一種常見的紅色或綠色水果" },
  { word: "banana", hint: "黃色且長條型的水果" },
  { word: "computer", hint: "現代人辦公與打遊戲常用的電子設備" },
  { word: "school", hint: "學生們每天去學習的地方" },
  { word: "elephant", hint: "體型巨大、有長鼻子和耳朵的動物" },
  { word: "guitar", hint: "一種有六根弦的彈撥樂器" },
  { word: "sunflower", hint: "總是向著太陽生長的黃色花朵" },
  { word: "umbrella", hint: "下雨天用來遮雨的工具" }
];

let currentQuestion = 0;
let correctCount = 0;
let userInput;
let submitBtn, repeatBtn;
let message = "點擊下方按鈕或聽取語音拼出單字！";
let isFinished = false;

function setup() {
  let canvas = createCanvas(700, 500);
  canvas.parent('game-container');

  // 建立輸入框
  userInput = createInput('');
  userInput.position(width / 2 - 160, height / 2 + 20);
  userInput.size(210, 38);
  userInput.style('font-size', '18px');
  userInput.style('padding', '5px');
  userInput.style('border-radius', '4px');
  userInput.style('border', '1px solid #ccc');

  // 建立送出按鈕
  submitBtn = createButton('送出答案');
  submitBtn.position(width / 2 + 60, height / 2 + 20);
  submitBtn.size(100, 50);
  submitBtn.style('font-size', '16px');
  submitBtn.style('cursor', 'pointer');
  submitBtn.style('background-color', '#4CAF50');
  submitBtn.style('color', 'white');
  submitBtn.style('border', 'none');
  submitBtn.style('border-radius', '4px');
  submitBtn.mousePressed(checkAnswer);

  // 建立重聽按鈕
  repeatBtn = createButton('🔊 播放語音');
  repeatBtn.position(width / 2 - 90, height / 2 - 40);
  repeatBtn.size(180, 42);
  repeatBtn.style('font-size', '16px');
  repeatBtn.style('cursor', 'pointer');
  repeatBtn.style('background-color', '#2196F3');
  repeatBtn.style('color', 'white');
  repeatBtn.style('border', 'none');
  repeatBtn.style('border-radius', '4px');
  repeatBtn.mousePressed(playAudio);

  // 進入頁面後自動唸出第一題
  setTimeout(playAudio, 500);
}

function draw() {
  background(245);

  // 標題與資訊
  fill(30);
  noStroke();
  textSize(28);
  textAlign(CENTER, TOP);
  text("🎵 英文聽力拼寫挑戰", width / 2, 35);

  textSize(16);
  fill(100);
  text(`目前題數: ${currentQuestion + 1} / ${questions.length}`, width / 2, 85);
  text(`答對題數: ${correctCount}`, width / 2, 110);

  if (!isFinished) {
    // 中文提示外框
    fill(235, 243, 255);
    stroke(180, 205, 235);
    rect(width / 2 - 220, 145, 440, 60, 8);

    fill(40);
    noStroke();
    textSize(16);
    text(`💡 中文提示: ${questions[currentQuestion].hint}`, width / 2, 165);

    // 狀態訊息
    textSize(16);
    fill(70);
    text(message, width / 2, height / 2 + 90);
  } else {
    // 隱藏輸入與按鈕
    userInput.hide();
    submitBtn.hide();
    repeatBtn.hide();

    // 結算畫面
    fill(0, 150, 0);
    textSize(30);
    text("🎉 恭喜完成所有聽力測驗！", width / 2, 180);

    textSize(24);
    fill(50);
    let finalScore = Math.round((correctCount / questions.length) * 100);
    text(`最終得分: ${finalScore} 分`, width / 2, 240);
    
    textSize(18);
    fill(100);
    text(`總共答對 ${correctCount} 題 / 滿分 100 分`, width / 2, 290);
  }
}

// 播放語音
function playAudio() {
  if (isFinished) return;
  let word = questions[currentQuestion].word;
  
  let utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US'; // 設定美式英文發音
  utterance.rate = 0.85;    // 語速稍微調慢，方便聽寫
  window.speechSynthesis.speak(utterance);
}

// 檢查答案
function checkAnswer() {
  if (isFinished) return;

  let userAns = userInput.value().trim().toLowerCase();
  let correctAns = questions[currentQuestion].word.toLowerCase();

  if (userAns === "") {
    message = "⚠️ 請先輸入英文單字！";
    return;
  }

  if (userAns === correctAns) {
    correctCount++;
    message = "✨ 答對了！太棒了！";
    setTimeout(nextQuestion, 1200);
  } else {
    message = `❌ 答錯了！正確答案是: ${questions[currentQuestion].word}`;
    setTimeout(nextQuestion, 2000);
  }
}

// 下一題
function nextQuestion() {
  currentQuestion++;
  userInput.value('');
  if (currentQuestion < questions.length) {
    message = "點擊「播放語音」聽下一題！";
    playAudio();
  } else {
    isFinished = true;
  }
}