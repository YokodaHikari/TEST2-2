//変数の定義
var result ="" ;        //計算結果画面に表示させる
var is_calc = false;    //=で計算したかどうか


//初期表示
window.onload = function () {
  result = document.getElementById('result');
}

//ACボタンクリック時は「０」にする
function ac_click() {
  result.value = "0";
  is_calc = false;
}

//数字ボタンクリック時の設定
function num_click(val){
  
  if(is_calc)  result.value = "0";
  is_calc = false;                              //計算後に数字を押した場合、計算結果画面を初期化する

  if(result.value =="0" && val == "0"){
    result.value = "0";                         //初期化後に「０」を押した場合、計算結果画面に「０」を表示
  }else if(result.value == "0" && val == "."){
    result.value = "0.";                        //初期化後に「.」を押した場合、計算結果画面に「.0」と表示
  }else if(result.value == "0"){
    result.value = val; 　　　　　　　　　　　　//それ以外の数字が入力されたら、計算結果画面に入力した数字を表示  
  }else{
    result.value += val;    　                 //入力した数字を連続して表示
  }
}


//演算子ボタンクリック時の設定
function ope_click(val){
  if(is_calc)  is_calc = false;
  
  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;　//直前の入力値が演算子の場合、入力した演算子に切り替える
  } else {
    result.value += val;                            //入力した演算子を計算式に付け加える
  }
}

//=クリック時の設定
function equal_click(){
  if(is_ope_last())  result.value = result.value.slice(0, -1);

  var temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();　//変数tempに計算式の計算結果を表示

  if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";　　　　　　　　　　//計算結果が最大もしくは数字が出ない場合、Errorを設定
  }else{
    result.value = temp;
    is_calc = true;
  }
}

function is_ope_last(){
  return ["+","-","×","÷"].includes(result.value.toString().slice(-1));　//計算式の最後の文字を取得し、４つの演算子と一致するかどうか
}