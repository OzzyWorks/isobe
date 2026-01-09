
import { Scene } from './types';

export const IMAGE_PROMPTS = {
  CLUB_ROOM: "CLUB_ROOM",
  HARBOR: "HARBOR",
  WATARU: "WATARU",
  GOU: "GOU",
  MISAKI: "MISAKI",
  SHADOW: "SHADOW"
};

export const SCENARIO: Record<string, Scene> = {
  start: {
    id: 'start',
    name: '渉',
    text: '「あー、暑い…。今日の練習、もう終わりでよくないか？ 磯辺の夏は、湿度が殺人的すぎるだろ。」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'wataru',
    choices: [
      { text: '豪に同意を求める', nextScene: 'talk_gou' },
      { text: '古い部誌を読み耽る', nextScene: 'read_diary_deep' },
      { text: '窓の外の異常な光景に気づく', nextScene: 'look_window' }
    ]
  },
  talk_gou: {
    id: 'talk_gou',
    name: '豪',
    text: '「甘いぞ渉！この暑さこそがヨット乗りの筋肉を育てるんだ！…と言いたいところだが、実は俺も限界だ。アイス、買いに行かないか？」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    choices: [
      { text: '購買部へ向かう', nextScene: 'go_shop' },
      { text: '「野獣先輩」の噂について聞く', nextScene: 'ask_legend' }
    ]
  },
  read_diary_deep: {
    id: 'read_diary_deep',
    name: '渉',
    text: '20年前の部誌に目が止まる。『…海が割れ、そこから一人の男が現れた。彼は枕を抱え、咆哮した。114514、と。』…これ、本当にヨット部の記録か？',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [
      { text: 'さらに前のページをめくる', nextScene: 'diary_past' },
      { text: '不気味なので本を閉じる', nextScene: 'start' }
    ]
  },
  look_window: {
    id: 'look_window',
    name: '渉',
    text: 'ヨットハーバーの向こうに、黄金に輝く人影が見えた気がした。いや、ただの陽炎か…？',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [
      { text: '岬先生に報告する', nextScene: 'check_teacher' },
      { text: '双眼鏡でズームする', nextScene: 'zoom_shadow' }
    ]
  },
  zoom_shadow: {
    id: 'zoom_shadow',
    name: '渉',
    text: '双眼鏡のレンズ越しに、男と目が合った気がした。男は親指を立て、「ナイスゥ！」と叫んだ（ような気がした）。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'shadow',
    choices: [
      { text: '自分の目を疑う', nextScene: 'start' },
      { text: '魂が震えるのを感じる', nextScene: 'ending_gag' }
    ]
  },
  go_shop: {
    id: 'go_shop',
    name: '豪',
    text: '「おばちゃん、ガリガリ君一つ！…ん？なんだこの『ホモ・サピエンス味』っていう新作は…？」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    choices: [
      { text: '新作を買ってみる', nextScene: 'eat_ice' },
      { text: '普通のソーダ味にする', nextScene: 'normal_ice' }
    ]
  },
  eat_ice: {
    id: 'eat_ice',
    name: '渉',
    text: '一口食べた瞬間、脳内に野太い声が響き渡った。「…逝きスギィ！」意識が遠のいていく…。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [{ text: '天を仰ぐ', nextScene: 'ending_gag' }]
  },
  normal_ice: {
    id: 'normal_ice',
    name: '豪',
    text: '「落ち着くなあ…。やっぱり夏はこれだよ。…ところで渉、あそこに落ちてる茶色の枕、お前のじゃないよな？」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    choices: [
      { text: '枕を拾い上げる', nextScene: 'pick_pillow' },
      { text: '無視して練習に戻る', nextScene: 'back_practice' }
    ]
  },
  pick_pillow: {
    id: 'pick_pillow',
    name: '渉',
    text: '枕に触れた瞬間、猛烈な睡魔に襲われた。この柔らかさ、この獣のような匂い…抗えない…。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [{ text: '深い眠りに落ちる', nextScene: 'ending_comedy_homework' }]
  },
  ask_legend: {
    id: 'ask_legend',
    name: '豪',
    text: '「ああ、あの噂か。検見川の浜に、夜な夜な『汚い叫び声』を上げながらヨットを漕ぐ怪人が出るってやつだろ。実は、俺の兄貴が…」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    choices: [
      { text: '兄貴の話を詳しく聞く', nextScene: 'brother_story' },
      { text: 'その怪人を探しに行こうと提案する', nextScene: 'hunt_beast' }
    ]
  },
  brother_story: {
    id: 'brother_story',
    name: '豪',
    text: '「兄貴が夜釣りをしていたら、海面を滑走する男が『あ、お疲れっしたー！』と挨拶してきたらしい。礼儀正しい怪人だよな。」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    choices: [
      { text: 'それはただの岬先生じゃないか？', nextScene: 'attack_sound' },
      { text: '怪人の正体を突き止めたい', nextScene: 'hunt_beast' }
    ]
  },
  hunt_beast: {
    id: 'hunt_beast',
    name: '渉',
    text: '俺たちは夜のハーバーに忍び込んだ。暗闇の中、確かにあの音が聞こえる。「ヤッ…ヤッ…！」',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'none',
    choices: [
      { text: '音の方向へ突撃する', nextScene: 'attack_sound' },
      { text: '慎重に様子を伺う', nextScene: 'watch_shadow' }
    ]
  },
  watch_shadow: {
    id: 'watch_shadow',
    name: '渉',
    text: '目を凝らすと、そこには一心不乱に腹筋を鍛える岬先生の姿が。「…よし、114514回達成だ。いいよ、来いよ、夏休み…！」',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'misaki',
    choices: [{ text: 'そっとしておく', nextScene: 'ending_comedy_homework' }]
  },
  attack_sound: {
    id: 'attack_sound',
    name: '岬先生',
    text: '「こら！夜中に何をしとる！…あ、渉か。ちょうどいい、このキュウリを運ぶのを手伝え。」',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'misaki',
    choices: [{ text: '手伝う', nextScene: 'ending_comedy_pepper' }]
  },
  check_teacher: {
    id: 'check_teacher',
    name: '岬先生',
    text: '「…見たか。あれが『沈まぬ男』の幻影だ。磯辺ヨット部に入部した者は、皆一度はあれに魅了される。」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'misaki',
    choices: [
      { text: '先生も見たことがあるのか聞く', nextScene: 'teacher_past' },
      { text: '「沈まぬ男」の正体は？', nextScene: 'what_is_man' }
    ]
  },
  what_is_man: {
    id: 'what_is_man',
    name: '岬先生',
    text: '「それは、夏の具現化だ。誰もが心の中に飼っている、奔放で力強い、それでいて少し不潔な欲望の象徴だよ。」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'misaki',
    choices: [
      { text: '深い話だ…', nextScene: 'ending_surreal' },
      { text: '適当なことを言ってませんか？', nextScene: 'start' }
    ]
  },
  teacher_past: {
    id: 'teacher_past',
    name: '岬先生',
    text: '先生は遠い目をした。「私の現役時代、部室のロッカーには常に『お茶』と『枕』が供えられていたものだ。それが勝利への儀式だった。」',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'misaki',
    choices: [
      { text: 'ロッカーを開けてみる', nextScene: 'open_locker' },
      { text: '今の練習と関係ない、と切り捨てる', nextScene: 'ignore_teacher' }
    ]
  },
  ignore_teacher: {
    id: 'ignore_teacher',
    name: '豪',
    text: '「おい渉、先生の話を無視して海に行こうぜ！今日は風がいい！」豪が強引に俺を連れ出した。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'gou',
    choices: [{ text: '海へ', nextScene: 'back_practice' }]
  },
  open_locker: {
    id: 'open_locker',
    name: '渉',
    text: 'ギィィ…と音を立てて開いたロッカーの中には、色褪せた水泳パンツが祀られていた。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [{ text: '手を合わせる', nextScene: 'ending_romance' }]
  },
  diary_past: {
    id: 'diary_past',
    name: '渉',
    text: 'ページをめくると、文字が渦を巻いて動き出した！「いいよ、来いよ…」という囁きが聞こえる。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'none',
    choices: [
      { text: '本の中に吸い込まれる', nextScene: 'sucked_in' },
      { text: '力技で本を閉じる', nextScene: 'close_book_force' }
    ]
  },
  close_book_force: {
    id: 'close_book_force',
    name: '渉',
    text: '「うおぉぉ！」渾身の力で本を閉じる。心臓がバクバク言っている。…危なかった、今何かを見たら戻れなくなっていた気がする。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'wataru',
    choices: [{ text: '落ち着く', nextScene: 'start' }]
  },
  sucked_in: {
    id: 'sucked_in',
    text: '気づけばそこは、重力が上下逆さまになった稲毛ヨットハーバーだった。空には巨大な顔が浮いている。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'none',
    choices: [{ text: '運命を受け入れる', nextScene: 'ending_sf' }]
  },
  back_practice: {
    id: 'back_practice',
    name: '豪',
    text: '「よし、じゃあ今日は沈脱（沈没したヨットを立て直す練習）の千本ノックだ！行くぞ渉！」',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'gou',
    choices: [
      { text: '限界まで耐える', nextScene: 'practice_limit' },
      { text: 'わざと沈没したままにする', nextScene: 'stay_under' }
    ]
  },
  practice_limit: {
    id: 'practice_limit',
    text: '夕暮れ時、俺たちの前には真っ赤に染まった海と、清々しい疲労感だけが残った。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'wataru',
    choices: [{ text: '明日も頑張ろう', nextScene: 'ending_true' }]
  },
  stay_under: {
    id: 'stay_under',
    text: '海中で、俺は魚になった。いや、魚と人間のハイブリッド、「マーマン」に進化したのだ。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'none',
    choices: [{ text: '深海へ', nextScene: 'ending_surreal' }]
  },
  // エンディング
  ending_true: {
    id: 'ending_true',
    text: '俺たちはついに辿り着いた。真の友情、真の夏。そこには野獣も一派もなく、ただ風と波を楽しむ少年たちがいた。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'wataru',
    isEnding: true,
    name: 'Ending: 聖なる夏休み'
  },
  ending_comedy_pepper: {
    id: 'ending_comedy_pepper',
    text: '結局、野獣先輩ではなく「ピーマン先輩」の影を追っていただけだった。岬先生のキュウリ農場は今日も平和だ。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'misaki',
    isEnding: true,
    name: 'Ending: ピーマンは見た'
  },
  ending_comedy_homework: {
    id: 'ending_comedy_homework',
    text: '岬先生にこっぴどく叱られた後、居残りで夏休みの宿題をさせられることになった。これもまた青春。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'gou',
    isEnding: true,
    name: 'Ending: 帰ってきた男たち'
  },
  ending_sf: {
    id: 'ending_sf',
    text: '異次元のハーバーで、俺たちは銀河系のヨットレースに参加することになった。敵は強大だが、114514の加護がある。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'none',
    isEnding: true,
    name: 'Ending: 異次元の海'
  },
  ending_romance: {
    id: 'ending_romance',
    text: '岬先生の過去を知った俺たちは、部室を聖地として守り抜くことを誓った。ホモソーシャルな絆は永遠だ。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'misaki',
    isEnding: true,
    name: 'Ending: 部室の密室'
  },
  ending_gag: {
    id: 'ending_gag',
    text: 'アイスの力で超サイヤ人ならぬ「超野獣人」に覚醒。磯辺高校の敷地ごと成層圏まで飛んでいってしまった。',
    background: IMAGE_PROMPTS.CLUB_ROOM,
    character: 'wataru',
    isEnding: true,
    name: 'Ending: 伝説の始まり'
  },
  ending_surreal: {
    id: 'ending_surreal',
    text: '俺は磯辺の海と一体化した。たまにヨットをひっくり返すのは、俺のちょっとした悪戯だ。',
    background: IMAGE_PROMPTS.HARBOR,
    character: 'none',
    isEnding: true,
    name: 'Ending: 磯辺の風、ただの風'
  }
};
