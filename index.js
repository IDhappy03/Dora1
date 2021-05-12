//전반적인 코드는 나긋해 님의 유튜브 채널과 디스코드 채널에서 알려주신 코드를 이용하여 만들었습니다.
//코로나 명령어는 유튜브 나긋해님 디스코드 채널 아이디어 공유방에 waffle#6876님이 올려주신 코드를 사용했습니다. 
//그 외 나머지 기능은 다른분들이 올려주신 코드를 조금씩 수정을 하여 만들었습니다.
//아직은 깔끔하게 작성하지는 못했지만 나중에 조금더 코딩을 잘 하게된다면 수정할 예정입니다.

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const moment = require("moment");
require("moment-duration-format");
const token = process.env.token;


client.on('ready', () => {
  console.log(`${client.user.tag} 봇에 로그인 하였습니다!`);
});

const convertImoticon = (who) => {
  if(who === "가위"){
    return "✌️"
  }
  else if(who === "보") {
    return "✋"
  }
  else if(who === "바위") {
    return "✊"
  }
  else if(who === "rkdnl") {
    return "✌️"
  }
  else if(who === "qkdnl") {
    return "✊"
  }
  else if(who === "qh") {
    return "✋"
  }
}

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date();
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
  const howMuch = 5000;

  if(msg.content === "돈받기"){
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        msg.reply(`오늘은 이미 받았잖아? 내일 받아!`);
        saveUser = user;
      }
      else {
        msg.reply(`**\`💰${howMuch}원\`**이 지급됐어!\n__${name}의__ 현재 잔액은 **\`💰${user.money}원\` -> \`💰${user.money + howMuch}원\`**이야!`);
        saveUser = {
          id,
          name,
          date,
          money : user.money + howMuch,
        }
      }
    }
    else {
      msg.reply(`${name}!! 시작하는걸 환영해! **\`💰${howMuch}원\`**이 지급됐어!`);
      saveUser = {id, name, date, money : howMuch};
    }

    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }
  // if(msg.content === `지갑`){
  //   let embed = new Discord.MessageEmbed() 
  //   .setTitle(`${id}님의 잔액`)
  //   .setColor("RANDOM")
  //   .setDescription(`현재 잔액 : ${user.money}`) 
    
  //   msg.channel.send(embed)
  // } 

  if(msg.content === `지갑`){
    let embed = new Discord.MessageEmbed() 
    .setColor("RANDOM")
    .setDescription(`**<@!${id}>님**의 잔액\n\n현재 잔액 : \`💰${user.money}원\``) 
    
    msg.channel.send(embed)
  } 


});
client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./attendance/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null; // 파일이 없다면 생성

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date();
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
  const year = "" + today.getFullYear();
  const month =  "" + (today.getMonth() + 1)
  const day = "" + today.getDate();
  const attendance = 1;

  if(msg.content === "출첵"){
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        msg.channel.send(`\n출첵는 하루에 한번만 가능합니다`);
        saveUser = user;
      }
      else {
        msg.channel.send(`${user}님의 출석기록\n\`${year}년${month}월${day}일\` 출석 완료했습니다`);
        saveUser = {
          id,
          name,
          date,
          attendance : user.money + attendance,
        }
      }
    }
    else {
      msg.channel.send(`\n${name}님 첫 출석입니다!\n\`${year}년${month}월${day}일\` 출석 완료했습니다.`);
      saveUser = {id, name, date, attendance : attendance};
    }

    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

});

client.on('message', (message) => {
  //기본 명령어
  if(message.author.bot) return;
  if(message.author.id === client.user.id) return;

  if(message.content === "가위" || message.content === "바위" || message.content === "보" || message.content === "rkdnl" || message.content === "qkdnl" || message.content === "qh") {
    const human = message.content;
    const list = ["가위", "바위", "보"]
    const random = Math.floor(Math.random() * 3);

    const bot = list[random]

    let winner = "";
    if(human === bot) {
      winner = "비김"
    }
    else {
      human === "가위" ? (winner = bot === "바위" ? "봇" : "인간") : "";
      human === "바위" ? (winner = bot === "보" ? "봇" : "인간") : "";
      human === "보" ? (winner = bot === "가위" ? "봇" : "인간") : "";
      human === "rkdnl" ? (winner = bot === "바위" ? "봇" : "인간") : "";
      human === "qkdnl" ? (winner = bot === "보" ? "봇" : "인간") : "";
      human === "qh" ? (winner = bot === "가위" ? "봇" : "인간") : "";
    }

    const result = 
    `
    사람 : \`${convertImoticon(human)}\` vs 봇 : \`${convertImoticon(bot)}\`
    ${winner === "비김" ? "우리는 비겼다 인간." : winner + "의 승리다"}
    `
    message.reply(result);
  }

  if (message.content ===  `!!핑`) {
    if(message.channel.type == 'dm')
    return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
    message.channel.send(`\`\`\`fix\n🏓 ${client.ws.ping}ms\n\`\`\``)
  } 
  if(message.content == "!!봇") {
    if(message.channel.type == 'dm')
  return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
    message.channel.send('https://dashboard.heroku.com/apps')
  }
  if(message.content === '!!아바타') {
    if(message.channel.type == 'dm')
    return message.reply(`\`dm\`에서 사용할 수 없는 명령어입니다.`)
    let embed = new Discord.MessageEmbed()

    .setTitle(`**${message.author.username}** 님의 아바타`)
    .setColor(`#A9F5F2`)
    .setImage(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=128`)

    message.channel.send({embed:embed})
  }
  if(message.content === '!!내정보') {
    if(message.channel.type === 'dm') 
    return message.reply("\`dm\`에서 사용할 수 없는 명령어 입니다.") 
  message.channel.send(`\`\`\`md\n# ${message.author.username}\n* 태그: ${message.author.username}#${message.author.discriminator}\n- 아이디: ${message.author.id}\n- 생일 ${message.author.createdAt}\n- 서버가입 ${message.member.joinedAt}\n\`\`\``)
  }
  if(message.content === `!!한강`) {
    const fetch = require('node-fetch')
        
    fetch('http://hangang.dkserver.wo.tc/').then(res => res.json()).then(json => {
        if(json.result) {
          let embed = new Discord.MessageEmbed()
          .setTitle('한강 수온')
          .setColor("BLUE")
          .setURL(`https://hangang.life/`)
          .setDescription(`\n한강 수온 : \`${json["temp"]}˚C\`\n체크 시간 : \`${json["time"]}\``)
            message.channel.send({embed:embed})
        } else { message.channel.send("API에 연결할 수 없음")
    }
    })
  } 

  

  if(message.content === "!!리스트") {
    if(message.channel.type == 'dm')
  return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
    if(message.author.id === "432038330264190977") {
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        let arr = client.guilds.cache.array()
        let list = ""
        list = `\`\`\`css\n`
    
        for (let i = 0; i < arr.length; i++) {
          // list += `${arr[i].name} - ${arr[i].id}\n`
          list += `${arr[i].name}\n`
        }
        list += `\`\`\`\n`
        embed.addField("list:", `${list}`)
    
        embed.setTimestamp()
        message.channel.send(embed)
    } else
      message.channel.send(`**__${message.author.username}__**넌 안됨 ㅅㄱ`)
    }

  //봇 정보 | 서버정보

  if (message.content == "!!si" || message.content === "!!냐") {
    let embed = new Discord.MessageEmbed()
    let img = "https://cdn.discordapp.com/attachments/747789641826172948/750699703758225448/744af0d16a6eddc1.jpg"
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]")
    embed.setColor("#186de6")
    embed.setAuthor(`${message.guild.name}의 서버 정보`, img)
    embed.setFooter(`도라에몽 BOT ❤️`)
    embed.addField("RAM usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    embed.addField("running time", `${duration}`, true)
    embed.addField("user", `${client.users.cache.size}`, true)
    embed.addField("server", `${client.guilds.cache.size}`, true)
    // embed.addField('channel',      `${client.channels.cache.size.toLocaleString()}`, true)
    embed.addField("Discord.js", `v${Discord.version}`, true)
    embed.addField("Node", `${process.version}`, true)

    embed.setTimestamp()
    message.channel.send(embed)
  }


if(message.content == "!!봇 가동시간") {
  if(message.channel.type == 'dm')
  return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  let embed = new Discord.MessageEmbed()
  var duration = moment.duration(client.uptime).format("D [일]  H [시간]  m [분]  s [초]");
  embed.addField('`가동시간`', `${duration}`, true);

  embed.setTimestamp()
  message.channel.send({embed:embed});
}


//제작자
if(message.content == "!!제작자") {
  if(message.channel.type == 'dm') 
  return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  message.channel.send(`\`\`\`md\n#제작자\n> [사이트이름](이름)\n1. [디스코드](삐삐야#9269)\n\`\`\``)
}

});

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

client.on('message', (message) => {
  if(message.author.bot) return;
  if(message.author.id === client.user.id) return;
//명령어

  if(message.content.startsWith("!!인증번호")) {
    if(message.channel.type == 'dm')
  return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
    let min = 0;
    let max = 99999;
    let dice_num = parseInt(Math.random() * (max - min) + min);
    message.channel.send(`인증번호:__**${dice_num}**__ 10분 이내에 입력해주세요!` )}

    
//시간표
  else if(message.content == "!!4반") {
    if(message.channel.type == 'dm')
  return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
    let helpImg = '';
    let commandList = [
      {name: '덕영고 3학년 4반 시간표', desc: '\n덕영고 3학년 4반 시간표를 알려준다'},
    ];
    let commandStr = '';
    let embed = new Discord.MessageEmbed()
      .setAuthor('4반 시간표', helpImg)
      .setColor('#186de6')
      .setFooter(``)
      .setImage(`https://cdn.discordapp.com/attachments/815600618675765269/818799306429431808/1615155164331.png`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('시간표', commandStr);

    message.channel.send({embed:embed})
  }
  else if(message.content == "!!고림3반") {
    if(message.channel.type == 'dm')
  return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
    let helpImg = '';
    let commandList = [
      {name: '고림고 3학년 3반 시간표', desc: '\n고림고 3학년 3반 시간표를 알려준다'},
    ];
    let commandStr = '';
    let embed = new Discord.MessageEmbed()
      .setAuthor('고림고 3반 시간표', helpImg)
      .setColor('#186de6')
      .setFooter(``)
      .setImage(`https://cdn.discordapp.com/attachments/815600618675765269/818799311437299712/1615282246516.jpg`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('시간표', commandStr);

    message.channel.send({embed:embed})
  }

  if(message.content == "!!덕영3반") {
    if(message.channel.type == 'dm')
  return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
    let helpImg = '';
    let commandList = [
      {name: '덕영고 3학년 3반 시간표', desc: '\n덕영고 3학년 3반 시간표를 알려준다'},
    ];
    let commandStr = '';
    let embed = new Discord.MessageEmbed()
      .setAuthor('덕영고 3반 시간표', helpImg)
      .setColor('#186de6')
      .setFooter(``)
      .setImage(`https://cdn.discordapp.com/attachments/478621518180384775/816269497013895178/unknown-3.png?size=512`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('시간표', commandStr);

    message.channel.send({embed:embed})
  }
  if(message.content == "!!고림8반") {
    if(message.channel.type == 'dm')
  return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
    let helpImg = '';
    let commandList = [
      {name: '고림고 3학년 8반 시간표', desc: '\n고림고 3학년 8반 시간표를 알려준다'},
    ];
    let commandStr = '';
    let embed = new Discord.MessageEmbed()
      .setAuthor('고림고 3반 시간표', helpImg)
      .setColor('#186de6')
      .setFooter(``)
      .setImage(`https://cdn.discordapp.com/attachments/815600618675765269/816978316833325086/unknown.png?size=512`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('시간표', commandStr);

    message.channel.send({embed:embed})
  }

//초대코드
if(message.content === `!!초대코드`) {
  let embed = new Discord.MessageEmbed()

  .setColor("RANDOM")
  .addField('저를 초대해주시겠다니 감사해요! \`\`초대주소\`\` 를 사용하여 초대 가능해요!', `[초대 주소](https://discord.com/api/oauth2/authorize?client_id=742635886998454293&permissions=8&scope=bot)`, true)
  
  message.channel.send({embed:embed})
}
  if(message.content === '!!명령어') {
    let img = 'https://cdn.discordapp.com/avatars/742635886998454293/0dd4ce22d10ee22c010624d28990e1e3.png?size=128';
    let embed = new Discord.MessageEmbed()
    
    .setTitle('도라에몽 명령어')
    .setColor("RANDOM")
    .setTimestamp()
    .addField('명령어' , `\`\`!!명령어\`\`,\`\`!!핑\`\`,\`\`!!초대코드\`\`,\`\`!!그리기\`\`,\`\`!!비밀도구\`\`,\`\`!!주사위\`\`,\`\`!!qlalfehrn\`\`,\n\`\`!!인증번호\`\`,\`!!돈받기\`,\`!!코로나\`,\`!!코로나 전체\``)
    .addField(`정보` , `\`\`!!아바타\`\`,\`\`!!제작자\`\`,\`\`!!내정보\`\``)
    .addField(`봇 정보`, `\`\`!!si\`\`,\`\`!!제작자\`\`,\`\`!!리스트\`\``)
  
    message.channel.send({embed:embed})
  }

    //비밀도구,주사위
    if(message.content.startsWith("!!비밀도구")) {
        if(message.channel.type == 'dm')
      return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
        let arr = [
          '가거라 개',
          '가공인물 계란',
          '가드로봇',
          '가시달린 침낭',
          '가공수면 펌프, 가공해저 체험안경, 가공해저 생존가능가스',
          '가뿐사뿐 낚싯대',
          '가상게임 보드',
          '가시복 배지',
          '간질간질 장갑',
          '간질이 벼룩',
          '감기 옮기는 전화',
          '강력부채 바람 신',
          '강력 시멘트',
          '강한 돌',
          '개그 레이더',
          '개미와 베짱이 배지',
          '개 버리는 경단',
          '거대입체 텔레비전',
          '거울 문',
          '거미줄 실패',
          '거짓말 기계',
          '거짓말 거울',
          '거짓말 800',
          '거꾸로 촉',
          '건망증 꽃',
          '걸리버 터널',
          '걸 프렌드 카탈로그',
          '결정하기',
          '경음파 발진식 쥐/바퀴벌레/진드기/흰개미 퇴치기', 
          '경쟁스테이크', 
          '경찰견 코', 
          '계급 배지', 
          '계속 스프레이', 
          '고르곤의 머리', 
          '고마워 링', 
          '고생 된장', 
          '고양이 용품들', 
          '고통 타이머', 
          '고 홈 오르골', 
          '고층 아파트화 엘리베이터', 
          '곤충 비행기 탑승장치', 
          '곤충을 부르는 보드', 
          '관광 비전', 
          '공간절단 가위', 
          '공기블록 제조기', 
          '공기포', 
          '공기총/공기 피스톨', 
          '공약 파스', 
          '공중 신발', 
          '공포 상자', 
          '공포증 도장', 
          '과장 카메라', 
          '과장 코트', 
          '과자 목초', 
          '관통 방석', 
          '광선총(열선총)', 
          '광고나팔', 
          '광고 사탕', 
          '괴담 램프', 
          '괴물모자', 
          '구름 굳히기 가스', 
          '구름 파이프', 
          '귀신 세트', 
          '귀신은 밖으로 콩', 
          '국제 보호 동물 스프레이', 
          '굴절 샤워', 
          '굽신굽신 메뚜기', 
          '그 거짓말 진짜', 
          '그렇게 되는 조개 세트', 
          '그림자를 자르는 가위', 
          '그림자를 붙이는 풀', 
          '극진하게', 
          '금지어 마커', 
          '금지 표지판', 
          '기분따라 따끈따끈 스티커', 
          '기억 디스크', 
          '기운나는 폭탄', 
          '길들이기 / 복숭아 동자표 경단', 
          '길 안내 보살', 
          '깜짝상자 스틱', 
          '꼬마 태풍의 눈(태순이)', 
          '꽃을 피우는 재', 
          '꿈꾸는 사람', 
          '꿈을 잇는 사다리', 
          '끈질긴 카메라', 
          '끌어당기는 거울', 
          '끔찍한 집', 
          '나만을 따르는 가스',
          '나무늘보 옷과 매달리는 나무',
          '나무꾼의 연못',
          '나이 연못 로프',
          '나중에 사탕',
          '나중에 진짜가 되는 스피커',
          '낙엽 번지',
          '날씨 결정표',
          '날씬해지는 터널',
          '남자여자',
          '낭비시간 저축 풍선',
          '낮처럼 등',
          '너구리',
          '넘어지게 해결사',
          '내 맘대로 모자',
          '내 말대로 밧줄',
          '뇌물초',
          '누구나 댄서',
          '눈 높은 카메라',
          '늑대인간 크림',
          '늘어나는 은행',
          '늘어나는 손',
          '늘었다 줄었다 두루마리',
          '능률 쑥쑥 사탕',
          '다른 사람이 안 보이는 안약',
          '다목적 부적',
          '다이어돈',
          '단단해지는 라이트',
          '단서 찾기 렌즈',
          '단어금지 마커',
          '단어로 순간이동',
          '달인 로봇',
          '닮은 애완동물 먹이',
          '담력시험 안경',
          '대나무 헬리콥터',
          '대답하면 빨려들어가는 페트병',
          '대체 포스트잇',
          '더빙 실 전화기',
          '데빌카드',
          '도깨비 타이머',
          '도루 게임 세트',
          '도와주는 배',
          '도와줘 경단',
          '독재자 스위치',
          '돈을 싫어하게 되는 사탕',
          '돌멩이 모자',
          '돌봐주는 로프',
          '돌아 돌아 돌아 링',
          '동면동굴(캡슐)',
          '돌풍배트',
          '동물 변신 비스킷',
          '동물 변신 은혜갚는 약',
          '동물놀이 모자',
          '동물 세트',
          '동물 손가락 캡',
          '동물이 되는 가루',
          '돗자리 낚시터',
          '두더지 장갑',
          '달팽이 하우스',
          '두배로',
          '둥실둥실 튜브',
          '드라마틱 가스',
          '드림 플레이어',
          '드림 총',
          '듣는 귀',
          '들어가는 거울',
          '대나무말',
          '러브러브 우산',
          '러브 아이스 박스',
          '렌탈 호출기',
          '럭키 총',
          '룸 카탈로그',
          '로보 양',
          '로봇 수호령',
          '로빈슨 크루소 세트',
          '로켓 빨대',
          '리포터 로봇',
          '마리혼 군',
          '마법 사전',
          '마술 배꼽',
          '마음의 흙',
          '마음을 불러내는 기계',
          '마음 나와라 당목',
          '마음이 변하는 부채',
          '마음 향수와 추억 향수',
          '마이크로광선',
          '만능 고삐',
          '만능 설계 장치',
          '만능클리너',
          '만능 텐트',
          '만능 패스',
          '만능 함정',
          '만담 돌',
          '만약에 박스',
          '만화상자',
          '맘대로 포토 프린터',
          '말하는 가스',
          '맛보기 스푼',
          '맛있는 안경',
          '맛있는 양념',
          '맹점별',
          '먹는 우주복',
          '먼거리 거울',
          '명연기 배지',
          '명검 전광환',
          '메카 메이커',
          '매드 워치',
          '모든 계절 배지',
          '메모리 디스크',
          '모아모아새',
          '모조 스프레이',
          '모형화 카메라',
          '목소리 고체화 액',
          '목소리 사탕',
          '몬스터 볼',
          '몰래 카메라',
          '몸 점토와 원래대로 액',
          '몽유봉',
          '몽타주 양동이',
          '무공해 자동 햄버거 패티 기계',
          '무서운 것을 만드는 기계',
          '무선 조종 자동차와 무선 조종 잠수함',
          '무생물 최면 메가폰',
          '무적대포',
          '무적창/무적방패',
          '무게조절 미터',
          '무시벌레',
          '문패 교환기',
          '물가공 세트',
          '물 건물 건축기',
          '물을 피하는 로프',
          '물 정화기',
          '물 비디오',
          '뭉실뭉실',
          '뭐든지 10원에 가게와 간판종이',
          '뭐든지 공항',
          '뭐든지 보험',
          '뭐든지 불러내는 마이크',
          '뭐든지 아이스크림 막대',
          '뭐든지 조종기',
          '미니 구조대 차',
          '미니 구조대 옷',
          '미니 방송국',
          '미니 불도저',
          '미래 라디오',
          '미래 물건 카탈로그',
          '미래 비전',
          '미래 수표',
          '미래 우주선',
          '미리 안테나',
          '미리 약속기계',
          '미리 일기장',
          '미사일 달린 원자력 잠수함',
          '미식가 테이블보',
          '미워 못 해 정 / 미워라 정',
          '미움 받기',
          '미니도라 전용 로켓',
          '민들레 빗',
          '밀폐공간 탐사기',
          '바뀌는 거울',
          '바다 생물 배',
          '바닷물 원료',
          '바퀴벌레 모자',
          '바퀴벌레 커버',
          '반대로 마이크',
          '반대로 세계 거울',
          '반드시 맞는 손금세트',
          '반만 외출 구름',
          '반으로 검',
          '발광 시트',
          '발명기',
          '발자국 추적 스프레이',
          '발자국으로 변하는 스프레이',
          '밤 램프',
          '방패 망토',
          '방 경비 시스템',
          '방 교환 스위치',
          '배달 가방',
          '배달 전화',
          '배역바꾸기 비디오',
          '배꼽 가스(헤소린 스탠드)',
          '백년 캡슐',
          '백설공주의 사과',
          '밸런스 트레이너',
          '버드캡',
          '벌레노래 소리꽃',
          '벌 주는 총',
          '벼락치기',
          '벽경치 전환기',
          '벽을 통해 밖을 볼 수 있는 기계',
          '변신 드링크',
          '변신등',
          '변신링과 카드',
          '변신 목걸이',
          '변신 머리띠',
          '별 제조 망치와 채집 채',
          '별똥별 유도 우산',
          '보너스',
          '보자기 택시',
          '복사 거울',
          '복사로봇',
          '복수 전표',
          '복원 라이트',
          '변신 옷(가칭)',
          '부르는 초인종',
          '부분 진화 총',
          '부엉이 사진기',
          '부화달걀',
          '분신망치',
          '분재세트',
          '블랙홀 펜',
          '비밀엄수 개',
          '비밀통로 라이트',
          '비사나이 해사나이 측정기',
          '비장의 기술 슈트',
          '빅 라이트',
          '빨라지는 태엽',
          '뻐꾸기 알',
          '뿔뿔이 드라이버',
          '사각판 엘리베이터',
          '사실부직포',
          '사물을 감추는 카메라',
          '사이좋게 껌',
          '사임 당근',
          '사파리 탐험차',
          '사랑을 키워주는 집',
          '산타 주머니',
          '산타의 굴뚝',
          '삼륜 비행기',
          '상자정원 시리즈',
          '상대방 스토퍼',
          '상황설명기',
          '상 받아라',
          '생물 복제기',
          '생물사육 디오라마북',
          '선물보자기',
          '선거견',
          '설계지',
          '셜록 홈즈 세트',
          '설계기',
          '설명서 제조기',
          '성장 로프',
          '세균 배양기',
          '세금 새',
          '세계기록(rock)',
          '세뱃돈 구슬',
          '세포축소기',
          '소금쟁이 과자',
          '소문 꽃씨',
          '소문 부채',
          '소문의 뿌리',
          '소원별',
          '소원실현기',
          '손오공 분신 샴푸',
          '소재 전등',
          '솜사탕식 구름 제조기',
          '쇼트 커터',
          '수압포',
          '수중 라이트',
          '순간고정 카메라',
          '순간이동 드라이어',
          '슈퍼 장갑',
          '슈퍼 캐치볼',
          '슈퍼맨 망토',
          '슈퍼 흐르는 국수',
          '스릴 부메랑',
          '스릴 티켓',
          '스몰 라이트',
          '스몰 스프레이',
          '스캔돈',
          '스케줄 시계',
          '스톱워치',
          '스파이 세트',
          '스파이 위성',
          '스트레이트 홀',
          '스페이스 애벌레',
          '승리를 부르는 장갑',
          '시간 저금통',
          '시나리오 라이터',
          '시키는 대로 모자',
          '시한 바보탄',
          '시문',
          '식물개조 농축액',
          '신기루 촛대',
          '신놀이 세트',
          '신선로봇',
          '신출귀몰 닌자세트',
          '실내 여행기',
          '실물 그림책',
          '실물 미니어처 백과사전',
          '실물 스프레이',
          '싫은 일 퓨즈',
          '심해 크림',
          '심해 헤드램프',
          '십계 석판',
          '싸움 장갑(반대글러브)',
          '싹둑식도',
          '쌍둥이 로봇',
          '쌍둥이 풍선',
          '씻어주는 구름',
          '아기 말 번역기',
          '아부 립스틱 / 악담 립스틱',
          '아탈 건',
          '아파트 놀이 나무',
          '악마 소환서',
          '악마의 저주',
          '악마의 패스포트',
          '악운 다이아몬드',
          '알딸딸 캡',
          '알뜰알밤',
          '알라빈의 램프',
          '안내천사',
          '안전지대 불',
          '안전 모닥불',
          '안전 불꽃놀이세트',
          '암기빵',
          '앙케이터',
          '애니멀 파워 벨트',
          '애니메이커',
          '애완 그림물감',
          '애완동물 크림',
          '애완동물 펜',
          '어드벤차(茶)',
          '어디로든 문',
          '어디로든 창문',
          '어디든지 수도꼭지',
          '어디든지 누구든지 롤러스케이트',
          '어디든지 구멍',
          '어떻게든 벌',
          '억지로 액',
          '얼음 세공 인두',
          '얼짱 복사 로봇',
          '엄마놀이 세트',
          '엄마 네트',
          '업그레이드 라이트',
          '엉덩이 모양 경단',
          '에이스 모자/마법의 글러브/황금 배트',
          '역전 조랑말',
          '연도 측정기',
          '연발형 불운 광선총',
          '열혈만두',
          '엿보기 구멍판',
          '영광의 카펫',
          '영역 엑기스',
          '영화감독 로봇',
          '영혼 막대기',
          '영혼 투입 총',
          '오공 링',
          '오싹오싹 향',
          '온천 자쿠지',
          '올빼미 맨',
          '옷 갈아입기 카메라(패션 카메라)',
          '온천에그',
          '완력 티켓',
          '요괴 크림 세트',
          '요술 장갑',
          '요술 엉덩이',
          '요정이 없는 마법램프',
          '용기백배 부채',
          '용돈벌이 침팬지',
          '우겨라 물약',
          '우산 없이',
          '우정 캡슐',
          '우주 구명 보트',
          '우주 완전 대백과 단말기',
          '울트라 링',
          '울트라 스톱워치(잠깐워치)',
          '원격조종 입과 눈',
          '원한두건',
          '원하는 꿈을 꾸게 하는 총',
          '월광등',
          '위치 고정 스프레이',
          '위로 로봇',
          '워워 봉',
          '위성 리프트',
          '유령 빨대',
          '유행성 바이러스',
          '육지용 보트 / 육지용 워터보트 / 육지용 잠수함',
          '은하철도 티켓',
          '은혜 갚는 학모자',
          '은혜 갚는 약',
          '은혜 사탕',
          '음악 고구마',
          '의사 선생님 가방',
          '의심귀신',
          '이동 분필',
          '이상하고 이상한 우산 시리즈',
          '이어주는 실',
          '이야기 배지',
          '인간 제조기',
          '인간 절단기',
          '인간 책표지',
          '인간 리모컨',
          '인내 주머니',
          '인스턴트 복사기',
          '인스턴트 사진 제조기',
          '인스턴트 수호령',
          '인체 부품 교체 기계',
          '인형오븐 인형코팅과 속을 채우는 내용물',
          '일곱색깔 목소리 사탕',
          '일품 조미료',
          '입체 퍼즐 망치',
          '잊은 물건 돌려주는 기계',
          '잊어 버려 꽃',
          '잃어버리는 물건을 다시 돌아오게 하는 스프레이',
          '자동으로 때려주는 가스',
          '자동 톱날',
          '자동 망치',
          '자백모자',
          '잘한다 파워 메가폰',
          '장난감 군대 / 장난감 병정',
          '장난감 만들기 카메라',
          '자신감 흔들기',
          '재미있는 세뱃돈 세트',
          '재질 변환기',
          '잭의 콩',
          '잭의 암탉 / 잭의 하프',
          '저주 카메라',
          '저절로 따라하기',
          '전격 트레이드',
          '절교 전화카드',
          '절대안전 구명뗏목',
          '절친 전화카드',
          '적응총',
          '전극 순간 이동 장치',
          '전차 바지',
          '전함 제조기',
          '점보총',
          '점핑 잠수함',
          '정령을 부르는 팔찌',
          '정의의 로프',
          '정리정돈 스프레이',
          '정리 페인트',
          '젖은 천',
          '제 눈에 안경씰',
          '제 마음대로 달력',
          '조립형 타이타닉 로봇',
          '종이접기 집',
          '좋은 점을 고를 수 있는 보드',
          '주머니 회오리',
          '주는 타이',
          '주전자 녹음기',
          '준비 땅 권총',
          '중독 알약',
          '중력 페인트',
          '즉석 스위트 홈(사랑을 키우는 집)',
          '즉석 엘리베이터',
          '지구파괴폭탄',
          '지킬과 하이드씨',
          '지평선 테이프',
          '지하 탐험 차',
          '직업테스트 완장',
          '진짜로 만드는 코끼리',
          '진수성찬 테이블보',
          '진심 거울 / 진심 모니터',
          '진실 사탕',
          '진화퇴화 방사선총',
          '진주 제조 아쿠아 케이스',
          '징 마이크',
          '집중력 증강 비눗방울 헬멧',
          '집 분위기 조절기',
          '집에서 하는 서바이벌 게임',
          '짬뽕 벨트',
          '쩍쩍이 그물',
          '찰싹끈적이',
          '참두꺼비 대왕',
          '챔피언 글러브',
          '찾았다람쥐',
          '척척 알약',
          '천구의',
          '천릿길도 한 걸음 빗자루',
          '천지창조 세트',
          '천사 나팔',
          '철근육 크림',
          '체인지 로프',
          '초능력 모자',
          '초능력 연습 장치',
          '초대알약',
          '초호화 손전등(디럭스 라이트)',
          '총알 크림',
          '최면 안경',
          '추억 향수',
          '추적 미사일',
          '충신 창고',
          '충격총',
          '취소 스탬프',
          '취미 일요농사 세트',
          '치타로션',
          '친구가 되어주는 줄',
          '청부업자 Z(넘어지게 해결사 Z)',
          '카멜레온 모자',
          '카멜레온 차',
          '캐릭터 상품 제조기',
          '캠핑 캡슐',
          '커플 테스트 배지',
          '컴퓨터 안경',
          '컴퓨터 연필',
          '컴온 캣',
          '컵 귀신',
          '컵 여행 세트',
          '코끼리표 립스틱',
          '퀵 앤 슬로우',
          '쿨쿨 허브',
          '큐피드의 날개',
          '큐피트의 화살',
          '키키',
          '타이타닉 로보',
          '타임 권총',
          '타임 리모컨',
          '타임 룸',
          '타임 릴',
          '타임머신',
          '타임 보자기',
          '타임 벨트',
          '타임 TV',
          '탐험모자',
          '타잔 팬티',
          '탈피등',
          '터치가 안 되는 가스',
          '터치 장갑',
          '털어놓는 가스',
          '텔레비전 끈끈이',
          '통과하는 후프',
          '통역 곤약',
          '통째로 커지고 작아지는 컵',
          '투명 막대기',
          '투명 망토',
          '투명손(투명 핸드)',
          '튀어오르는 함정',
          '특이한 저금통 시리즈',
          '미래의 저금통',
          '블록 저금통',
          '최면술 저금통',
          '감시견 저금통',
          '사람 저금통',
          '게 저금통',
          '티끌 모아 모아',
          '티끌 모아 태산 은행',
          '파장파장 글러브',
          '파이터 슈트',
          '파초부채',
          '판다다',
          '판타 글래스',
          '피노키오 꽃',
          '팝콘 햇',
          '팬클럽 결성 본부와 팬클럽 배지',
          '펀칭 피스톨',
          '페이퍼 레이더',
          '펫 호루라기',
          '편안한 등산모',
          '편애 배지',
          '평화 안테나(平和アンテナ)',
          '폴라로이드 인스턴트 미니어처 제조 사진기',
          '풍운 도라에몽 성',
          '프리사이즈 인형 사진기',
          '폭소 후추',
          '하고 싶은 대로 하는 달력',
          '하늘의 채찍',
          '하늘을 나는 작은 융단',
          '하늘정원',
          '하우스 로봇',
          '하인 스티커',
          '하늘을 나는 보자기',
          '하숙나무',
          '한 것처럼',
          '한 마음 초콜릿',
          '합체 풀',
          '해신 포세이돈 세트',
          '해피',
          '핵잠수함형 태엽식 잠지함',
          '핸디캡',
          '행복의 산책로',
          '행복의 상징 파랑새와 그물',
          '행복을 부르는 카드(구)',
          '행복 트럼프',
          '행복 보험기',
          '행운불행인형',
          '헬스 하우스',
          '혓바닥 세트',
          '형제 스티커',
          '화려해지는 라이트',
          '화해하는 종',
          '회오리 나팔',
          '호랑이 꼬리 세트',
          '혼령 배지',
          '혼자만 코트',
          '홈 미로',
          '휴대용 가족',
          '휴대용 국회',
          '휴대용 피라미드',
          'VIP 크림',
          'XYZ 선 카메라',
          '2차원 카메라',
          '3배 시간 스티커',
          '3분의 1배 시간 스티커',
          '4차원 주머니',
          '4차원 조립식 블럭',
          '4차원 쓰레기통',
          '6음 플라워',
          '7번 넘어지는 무당벌레',
          '12분의 1배 시간 스티커',
          '4차원 예비 주머니',
          '어디로든 가스',
          '인스턴트 펄',
          '깜짝라이트',
          'B급음식이 나오는 식탁보',
    ]
        let min = 0;
        let max = arr.length;
        let index = parseInt(Math.random() * (max - min) + min);
        message.channel.send(`${arr[index]} (이)라는 도구가 나왔어.`)
      }
    
    
      else if(message.content.startsWith("!!주사위")) {
        if(message.channel.type == 'dm')
      return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
        let min = 1;
        let max = 7;
        let dice_num = parseInt(Math.random() * (max - min) + min);
        return message.reply(`**__${dice_num}__**`);
      } else if(message.content.startsWith("!!qlalfehrn")) {
        if(message.channel.type == 'dm')
      return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
        let arr = [
          '가거라 개',
          '가공인물 계란',
          '가드로봇',
          '가시달린 침낭',
          '가공수면 펌프, 가공해저 체험안경, 가공해저 생존가능가스',
          '가뿐사뿐 낚싯대',
          '가상게임 보드',
          '가시복 배지',
          '간질간질 장갑',
          '간질이 벼룩',
          '감기 옮기는 전화',
          '강력부채 바람 신',
          '강력 시멘트',
          '강한 돌',
          '개그 레이더',
          '개미와 베짱이 배지',
          '개 버리는 경단',
          '거대입체 텔레비전',
          '거울 문',
          '거미줄 실패',
          '거짓말 기계',
          '거짓말 거울',
          '거짓말 800',
          '거꾸로 촉',
          '건망증 꽃',
          '걸리버 터널',
          '걸 프렌드 카탈로그',
          '결정하기',
          '경음파 발진식 쥐/바퀴벌레/진드기/흰개미 퇴치기', 
          '경쟁스테이크', 
          '경찰견 코', 
          '계급 배지', 
          '계속 스프레이', 
          '고르곤의 머리', 
          '고마워 링', 
          '고생 된장', 
          '고양이 용품들', 
          '고통 타이머', 
          '고 홈 오르골', 
          '고층 아파트화 엘리베이터', 
          '곤충 비행기 탑승장치', 
          '곤충을 부르는 보드', 
          '관광 비전', 
          '공간절단 가위', 
          '공기블록 제조기', 
          '공기포', 
          '공기총/공기 피스톨', 
          '공약 파스', 
          '공중 신발', 
          '공포 상자', 
          '공포증 도장', 
          '과장 카메라', 
          '과장 코트', 
          '과자 목초', 
          '관통 방석', 
          '광선총(열선총)', 
          '광고나팔', 
          '광고 사탕', 
          '괴담 램프', 
          '괴물모자', 
          '구름 굳히기 가스', 
          '구름 파이프', 
          '귀신 세트', 
          '귀신은 밖으로 콩', 
          '국제 보호 동물 스프레이', 
          '굴절 샤워', 
          '굽신굽신 메뚜기', 
          '그 거짓말 진짜', 
          '그렇게 되는 조개 세트', 
          '그림자를 자르는 가위', 
          '그림자를 붙이는 풀', 
          '극진하게', 
          '금지어 마커', 
          '금지 표지판', 
          '기분따라 따끈따끈 스티커', 
          '기억 디스크', 
          '기운나는 폭탄', 
          '길들이기 / 복숭아 동자표 경단', 
          '길 안내 보살', 
          '깜짝상자 스틱', 
          '꼬마 태풍의 눈(태순이)', 
          '꽃을 피우는 재', 
          '꿈꾸는 사람', 
          '꿈을 잇는 사다리', 
          '끈질긴 카메라', 
          '끌어당기는 거울', 
          '끔찍한 집', 
          '나만을 따르는 가스',
          '나무늘보 옷과 매달리는 나무',
          '나무꾼의 연못',
          '나이 연못 로프',
          '나중에 사탕',
          '나중에 진짜가 되는 스피커',
          '낙엽 번지',
          '날씨 결정표',
          '날씬해지는 터널',
          '남자여자',
          '낭비시간 저축 풍선',
          '낮처럼 등',
          '너구리',
          '넘어지게 해결사',
          '내 맘대로 모자',
          '내 말대로 밧줄',
          '뇌물초',
          '누구나 댄서',
          '눈 높은 카메라',
          '늑대인간 크림',
          '늘어나는 은행',
          '늘어나는 손',
          '늘었다 줄었다 두루마리',
          '능률 쑥쑥 사탕',
          '다른 사람이 안 보이는 안약',
          '다목적 부적',
          '다이어돈',
          '단단해지는 라이트',
          '단서 찾기 렌즈',
          '단어금지 마커',
          '단어로 순간이동',
          '달인 로봇',
          '닮은 애완동물 먹이',
          '담력시험 안경',
          '대나무 헬리콥터',
          '대답하면 빨려들어가는 페트병',
          '대체 포스트잇',
          '더빙 실 전화기',
          '데빌카드',
          '도깨비 타이머',
          '도루 게임 세트',
          '도와주는 배',
          '도와줘 경단',
          '독재자 스위치',
          '돈을 싫어하게 되는 사탕',
          '돌멩이 모자',
          '돌봐주는 로프',
          '돌아 돌아 돌아 링',
          '동면동굴(캡슐)',
          '돌풍배트',
          '동물 변신 비스킷',
          '동물 변신 은혜갚는 약',
          '동물놀이 모자',
          '동물 세트',
          '동물 손가락 캡',
          '동물이 되는 가루',
          '돗자리 낚시터',
          '두더지 장갑',
          '달팽이 하우스',
          '두배로',
          '둥실둥실 튜브',
          '드라마틱 가스',
          '드림 플레이어',
          '드림 총',
          '듣는 귀',
          '들어가는 거울',
          '대나무말',
          '러브러브 우산',
          '러브 아이스 박스',
          '렌탈 호출기',
          '럭키 총',
          '룸 카탈로그',
          '로보 양',
          '로봇 수호령',
          '로빈슨 크루소 세트',
          '로켓 빨대',
          '리포터 로봇',
          '마리혼 군',
          '마법 사전',
          '마술 배꼽',
          '마음의 흙',
          '마음을 불러내는 기계',
          '마음 나와라 당목',
          '마음이 변하는 부채',
          '마음 향수와 추억 향수',
          '마이크로광선',
          '만능 고삐',
          '만능 설계 장치',
          '만능클리너',
          '만능 텐트',
          '만능 패스',
          '만능 함정',
          '만담 돌',
          '만약에 박스',
          '만화상자',
          '맘대로 포토 프린터',
          '말하는 가스',
          '맛보기 스푼',
          '맛있는 안경',
          '맛있는 양념',
          '맹점별',
          '먹는 우주복',
          '먼거리 거울',
          '명연기 배지',
          '명검 전광환',
          '메카 메이커',
          '매드 워치',
          '모든 계절 배지',
          '메모리 디스크',
          '모아모아새',
          '모조 스프레이',
          '모형화 카메라',
          '목소리 고체화 액',
          '목소리 사탕',
          '몬스터 볼',
          '몰래 카메라',
          '몸 점토와 원래대로 액',
          '몽유봉',
          '몽타주 양동이',
          '무공해 자동 햄버거 패티 기계',
          '무서운 것을 만드는 기계',
          '무선 조종 자동차와 무선 조종 잠수함',
          '무생물 최면 메가폰',
          '무적대포',
          '무적창/무적방패',
          '무게조절 미터',
          '무시벌레',
          '문패 교환기',
          '물가공 세트',
          '물 건물 건축기',
          '물을 피하는 로프',
          '물 정화기',
          '물 비디오',
          '뭉실뭉실',
          '뭐든지 10원에 가게와 간판종이',
          '뭐든지 공항',
          '뭐든지 보험',
          '뭐든지 불러내는 마이크',
          '뭐든지 아이스크림 막대',
          '뭐든지 조종기',
          '미니 구조대 차',
          '미니 구조대 옷',
          '미니 방송국',
          '미니 불도저',
          '미래 라디오',
          '미래 물건 카탈로그',
          '미래 비전',
          '미래 수표',
          '미래 우주선',
          '미리 안테나',
          '미리 약속기계',
          '미리 일기장',
          '미사일 달린 원자력 잠수함',
          '미식가 테이블보',
          '미워 못 해 정 / 미워라 정',
          '미움 받기',
          '미니도라 전용 로켓',
          '민들레 빗',
          '밀폐공간 탐사기',
          '바뀌는 거울',
          '바다 생물 배',
          '바닷물 원료',
          '바퀴벌레 모자',
          '바퀴벌레 커버',
          '반대로 마이크',
          '반대로 세계 거울',
          '반드시 맞는 손금세트',
          '반만 외출 구름',
          '반으로 검',
          '발광 시트',
          '발명기',
          '발자국 추적 스프레이',
          '발자국으로 변하는 스프레이',
          '밤 램프',
          '방패 망토',
          '방 경비 시스템',
          '방 교환 스위치',
          '배달 가방',
          '배달 전화',
          '배역바꾸기 비디오',
          '배꼽 가스(헤소린 스탠드)',
          '백년 캡슐',
          '백설공주의 사과',
          '밸런스 트레이너',
          '버드캡',
          '벌레노래 소리꽃',
          '벌 주는 총',
          '벼락치기',
          '벽경치 전환기',
          '벽을 통해 밖을 볼 수 있는 기계',
          '변신 드링크',
          '변신등',
          '변신링과 카드',
          '변신 목걸이',
          '변신 머리띠',
          '별 제조 망치와 채집 채',
          '별똥별 유도 우산',
          '보너스',
          '보자기 택시',
          '복사 거울',
          '복사로봇',
          '복수 전표',
          '복원 라이트',
          '변신 옷(가칭)',
          '부르는 초인종',
          '부분 진화 총',
          '부엉이 사진기',
          '부화달걀',
          '분신망치',
          '분재세트',
          '블랙홀 펜',
          '비밀엄수 개',
          '비밀통로 라이트',
          '비사나이 해사나이 측정기',
          '비장의 기술 슈트',
          '빅 라이트',
          '빨라지는 태엽',
          '뻐꾸기 알',
          '뿔뿔이 드라이버',
          '사각판 엘리베이터',
          '사실부직포',
          '사물을 감추는 카메라',
          '사이좋게 껌',
          '사임 당근',
          '사파리 탐험차',
          '사랑을 키워주는 집',
          '산타 주머니',
          '산타의 굴뚝',
          '삼륜 비행기',
          '상자정원 시리즈',
          '상대방 스토퍼',
          '상황설명기',
          '상 받아라',
          '생물 복제기',
          '생물사육 디오라마북',
          '선물보자기',
          '선거견',
          '설계지',
          '셜록 홈즈 세트',
          '설계기',
          '설명서 제조기',
          '성장 로프',
          '세균 배양기',
          '세금 새',
          '세계기록(rock)',
          '세뱃돈 구슬',
          '세포축소기',
          '소금쟁이 과자',
          '소문 꽃씨',
          '소문 부채',
          '소문의 뿌리',
          '소원별',
          '소원실현기',
          '손오공 분신 샴푸',
          '소재 전등',
          '솜사탕식 구름 제조기',
          '쇼트 커터',
          '수압포',
          '수중 라이트',
          '순간고정 카메라',
          '순간이동 드라이어',
          '슈퍼 장갑',
          '슈퍼 캐치볼',
          '슈퍼맨 망토',
          '슈퍼 흐르는 국수',
          '스릴 부메랑',
          '스릴 티켓',
          '스몰 라이트',
          '스몰 스프레이',
          '스캔돈',
          '스케줄 시계',
          '스톱워치',
          '스파이 세트',
          '스파이 위성',
          '스트레이트 홀',
          '스페이스 애벌레',
          '승리를 부르는 장갑',
          '시간 저금통',
          '시나리오 라이터',
          '시키는 대로 모자',
          '시한 바보탄',
          '시문',
          '식물개조 농축액',
          '신기루 촛대',
          '신놀이 세트',
          '신선로봇',
          '신출귀몰 닌자세트',
          '실내 여행기',
          '실물 그림책',
          '실물 미니어처 백과사전',
          '실물 스프레이',
          '싫은 일 퓨즈',
          '심해 크림',
          '심해 헤드램프',
          '십계 석판',
          '싸움 장갑(반대글러브)',
          '싹둑식도',
          '쌍둥이 로봇',
          '쌍둥이 풍선',
          '씻어주는 구름',
          '아기 말 번역기',
          '아부 립스틱 / 악담 립스틱',
          '아탈 건',
          '아파트 놀이 나무',
          '악마 소환서',
          '악마의 저주',
          '악마의 패스포트',
          '악운 다이아몬드',
          '알딸딸 캡',
          '알뜰알밤',
          '알라빈의 램프',
          '안내천사',
          '안전지대 불',
          '안전 모닥불',
          '안전 불꽃놀이세트',
          '암기빵',
          '앙케이터',
          '애니멀 파워 벨트',
          '애니메이커',
          '애완 그림물감',
          '애완동물 크림',
          '애완동물 펜',
          '어드벤차(茶)',
          '어디로든 문',
          '어디로든 창문',
          '어디든지 수도꼭지',
          '어디든지 누구든지 롤러스케이트',
          '어디든지 구멍',
          '어떻게든 벌',
          '억지로 액',
          '얼음 세공 인두',
          '얼짱 복사 로봇',
          '엄마놀이 세트',
          '엄마 네트',
          '업그레이드 라이트',
          '엉덩이 모양 경단',
          '에이스 모자/마법의 글러브/황금 배트',
          '역전 조랑말',
          '연도 측정기',
          '연발형 불운 광선총',
          '열혈만두',
          '엿보기 구멍판',
          '영광의 카펫',
          '영역 엑기스',
          '영화감독 로봇',
          '영혼 막대기',
          '영혼 투입 총',
          '오공 링',
          '오싹오싹 향',
          '온천 자쿠지',
          '올빼미 맨',
          '옷 갈아입기 카메라(패션 카메라)',
          '온천에그',
          '완력 티켓',
          '요괴 크림 세트',
          '요술 장갑',
          '요술 엉덩이',
          '요정이 없는 마법램프',
          '용기백배 부채',
          '용돈벌이 침팬지',
          '우겨라 물약',
          '우산 없이',
          '우정 캡슐',
          '우주 구명 보트',
          '우주 완전 대백과 단말기',
          '울트라 링',
          '울트라 스톱워치(잠깐워치)',
          '원격조종 입과 눈',
          '원한두건',
          '원하는 꿈을 꾸게 하는 총',
          '월광등',
          '위치 고정 스프레이',
          '위로 로봇',
          '워워 봉',
          '위성 리프트',
          '유령 빨대',
          '유행성 바이러스',
          '육지용 보트 / 육지용 워터보트 / 육지용 잠수함',
          '은하철도 티켓',
          '은혜 갚는 학모자',
          '은혜 갚는 약',
          '은혜 사탕',
          '음악 고구마',
          '의사 선생님 가방',
          '의심귀신',
          '이동 분필',
          '이상하고 이상한 우산 시리즈',
          '이어주는 실',
          '이야기 배지',
          '인간 제조기',
          '인간 절단기',
          '인간 책표지',
          '인간 리모컨',
          '인내 주머니',
          '인스턴트 복사기',
          '인스턴트 사진 제조기',
          '인스턴트 수호령',
          '인체 부품 교체 기계',
          '인형오븐 인형코팅과 속을 채우는 내용물',
          '일곱색깔 목소리 사탕',
          '일품 조미료',
          '입체 퍼즐 망치',
          '잊은 물건 돌려주는 기계',
          '잊어 버려 꽃',
          '잃어버리는 물건을 다시 돌아오게 하는 스프레이',
          '자동으로 때려주는 가스',
          '자동 톱날',
          '자동 망치',
          '자백모자',
          '잘한다 파워 메가폰',
          '장난감 군대 / 장난감 병정',
          '장난감 만들기 카메라',
          '자신감 흔들기',
          '재미있는 세뱃돈 세트',
          '재질 변환기',
          '잭의 콩',
          '잭의 암탉 / 잭의 하프',
          '저주 카메라',
          '저절로 따라하기',
          '전격 트레이드',
          '절교 전화카드',
          '절대안전 구명뗏목',
          '절친 전화카드',
          '적응총',
          '전극 순간 이동 장치',
          '전차 바지',
          '전함 제조기',
          '점보총',
          '점핑 잠수함',
          '정령을 부르는 팔찌',
          '정의의 로프',
          '정리정돈 스프레이',
          '정리 페인트',
          '젖은 천',
          '제 눈에 안경씰',
          '제 마음대로 달력',
          '조립형 타이타닉 로봇',
          '종이접기 집',
          '좋은 점을 고를 수 있는 보드',
          '주머니 회오리',
          '주는 타이',
          '주전자 녹음기',
          '준비 땅 권총',
          '중독 알약',
          '중력 페인트',
          '즉석 스위트 홈(사랑을 키우는 집)',
          '즉석 엘리베이터',
          '지구파괴폭탄',
          '지킬과 하이드씨',
          '지평선 테이프',
          '지하 탐험 차',
          '직업테스트 완장',
          '진짜로 만드는 코끼리',
          '진수성찬 테이블보',
          '진심 거울 / 진심 모니터',
          '진실 사탕',
          '진화퇴화 방사선총',
          '진주 제조 아쿠아 케이스',
          '징 마이크',
          '집중력 증강 비눗방울 헬멧',
          '집 분위기 조절기',
          '집에서 하는 서바이벌 게임',
          '짬뽕 벨트',
          '쩍쩍이 그물',
          '찰싹끈적이',
          '참두꺼비 대왕',
          '챔피언 글러브',
          '찾았다람쥐',
          '척척 알약',
          '천구의',
          '천릿길도 한 걸음 빗자루',
          '천지창조 세트',
          '천사 나팔',
          '철근육 크림',
          '체인지 로프',
          '초능력 모자',
          '초능력 연습 장치',
          '초대알약',
          '초호화 손전등(디럭스 라이트)',
          '총알 크림',
          '최면 안경',
          '추억 향수',
          '추적 미사일',
          '충신 창고',
          '충격총',
          '취소 스탬프',
          '취미 일요농사 세트',
          '치타로션',
          '친구가 되어주는 줄',
          '청부업자 Z(넘어지게 해결사 Z)',
          '카멜레온 모자',
          '카멜레온 차',
          '캐릭터 상품 제조기',
          '캠핑 캡슐',
          '커플 테스트 배지',
          '컴퓨터 안경',
          '컴퓨터 연필',
          '컴온 캣',
          '컵 귀신',
          '컵 여행 세트',
          '코끼리표 립스틱',
          '퀵 앤 슬로우',
          '쿨쿨 허브',
          '큐피드의 날개',
          '큐피트의 화살',
          '키키',
          '타이타닉 로보',
          '타임 권총',
          '타임 리모컨',
          '타임 룸',
          '타임 릴',
          '타임머신',
          '타임 보자기',
          '타임 벨트',
          '타임 TV',
          '탐험모자',
          '타잔 팬티',
          '탈피등',
          '터치가 안 되는 가스',
          '터치 장갑',
          '털어놓는 가스',
          '텔레비전 끈끈이',
          '통과하는 후프',
          '통역 곤약',
          '통째로 커지고 작아지는 컵',
          '투명 막대기',
          '투명 망토',
          '투명손(투명 핸드)',
          '튀어오르는 함정',
          '특이한 저금통 시리즈',
          '미래의 저금통',
          '블록 저금통',
          '최면술 저금통',
          '감시견 저금통',
          '사람 저금통',
          '게 저금통',
          '티끌 모아 모아',
          '티끌 모아 태산 은행',
          '파장파장 글러브',
          '파이터 슈트',
          '파초부채',
          '판다다',
          '판타 글래스',
          '피노키오 꽃',
          '팝콘 햇',
          '팬클럽 결성 본부와 팬클럽 배지',
          '펀칭 피스톨',
          '페이퍼 레이더',
          '펫 호루라기',
          '편안한 등산모',
          '편애 배지',
          '평화 안테나(平和アンテナ)',
          '폴라로이드 인스턴트 미니어처 제조 사진기',
          '풍운 도라에몽 성',
          '프리사이즈 인형 사진기',
          '폭소 후추',
          '하고 싶은 대로 하는 달력',
          '하늘의 채찍',
          '하늘을 나는 작은 융단',
          '하늘정원',
          '하우스 로봇',
          '하인 스티커',
          '하늘을 나는 보자기',
          '하숙나무',
          '한 것처럼',
          '한 마음 초콜릿',
          '합체 풀',
          '해신 포세이돈 세트',
          '해피',
          '핵잠수함형 태엽식 잠지함',
          '핸디캡',
          '행복의 산책로',
          '행복의 상징 파랑새와 그물',
          '행복을 부르는 카드(구)',
          '행복 트럼프',
          '행복 보험기',
          '행운불행인형',
          '헬스 하우스',
          '혓바닥 세트',
          '형제 스티커',
          '화려해지는 라이트',
          '화해하는 종',
          '회오리 나팔',
          '호랑이 꼬리 세트',
          '혼령 배지',
          '혼자만 코트',
          '홈 미로',
          '휴대용 가족',
          '휴대용 국회',
          '휴대용 피라미드',
          'VIP 크림',
          'XYZ 선 카메라',
          '2차원 카메라',
          '3배 시간 스티커',
          '3분의 1배 시간 스티커',
          '4차원 주머니',
          '4차원 조립식 블럭',
          '4차원 쓰레기통',
          '6음 플라워',
          '7번 넘어지는 무당벌레',
          '12분의 1배 시간 스티커',
          '4차원 예비 주머니',
          '어디로든 가스',
          '인스턴트 펄',
          '깜짝라이트',
          'B급음식이 나오는 식탁보',
    ]
        let min = 0;
        let max = arr.length;     
        let index = parseInt(Math.random() * (max - min) + min);
        message.channel.send(`${arr[index]} (이)라는 도구가 나왔어.`)
      }


//코로나

  if(message.content === `!!코로나`) {
    const request = require("request")
  
  
    let url = "https://apiv2.corona-live.com/stats.json"
    request(url, (error, response, body) => {
        let overview = JSON.parse(response.body).overview;
        overview = {
            total_confirmed_person: overview.confirmed[0], // 총 확진자수
            yesterday_confirmed_person: overview.confirmed[1], // 어제 확진자수
    
            current_confirmed_person: overview.current[0], // 현재 확진자수
            current_confirmed_person_diff: overview.current[1], // diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
        }
    
    
        let embed = new Discord.MessageEmbed()
        embed.setTitle('코로나')
        embed.setURL('https://corona-live.com')
        embed.setColor('#FF8000')
        embed.setDescription('증상이 있으실 경우 주변 접촉자에게 알리신 후 인근 보건소를 찾아주시기 바랍니다')
        embed.addField(`대한민국 총 확진자수`, `${overview.total_confirmed_person}명`, true)
        embed.addField(`어제 확진자수`, overview.yesterday_confirmed_person + `명`, true)
        embed.addField(`오늘 확진자수(집계중)`, overview.current_confirmed_person + `명`, true)
        // embed.addField(`오늘 어제지금시간   -   현재지금시간의 확진자`, overview.current_confirmed_person_diff + `명`, true)
        message.channel.send(embed)
    
    })
  }

if(message.content === "!!코로나 전체") {

  const request = require("request")


  let url = "https://apiv2.corona-live.com/stats.json"
  request(url, (error, response, body) => {
      let overview = JSON.parse(response.body).overview;
      overview = {
          total_confirmed_person: overview.confirmed[0], // 총 확진자수
          yesterday_confirmed_person: overview.confirmed[1], // 어제 확진자수
  
          current_confirmed_person: overview.current[0], // 현재 확진자수
          current_confirmed_person_diff: overview.current[1], // diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
      }
  
      let current = JSON.parse(response.body).current;
      current = {
          seoul_confirmed_person: current[0].cases[0], // 서울 현재 확진자 수
          seoul_confirmed_person_diff: current[0].cases[1], // 서울 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          busan_confirmed_person: current[1].cases[0],//부산 현재 확진자 수
          busan_confirmed_person_diff: current[1].cases[1],//부산 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          incheon_confirmed_person: current[2].cases[0],//인천 현재 확진자 수
          incheon_confirmed_person_diff: current[2].cases[1],//인천 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          daegu_confirmed_person: current[3].cases[0],//대구 현재 확진자 수
          daegu_confirmed_person_diff: current[3].cases[1],//대구 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          gwangju_confirmed_person: current[4].cases[0],//광주 현재 확진자 수
          gwangju_confirmed_person_diff: current[4].cases[1],//광주 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          daejeon_confirmed_person: current[5].cases[0],//대전 현재 확진자 수
          daejeon_confirmed_person_diff: current[5].cases[1],//대전 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          ulsan_confirmed_person: current[6].cases[0],//울산 현재 확진자 수
          ulsan_confirmed_person_diff: current[6].cases[1],//울산 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          sejong_confirmed_person: current[7].cases[0],//세종 현재 확진자 수
          sejong_confirmed_person_diff: current[7].cases[1],//세종 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          gyeonggi_confirmed_person: current[8].cases[0],//경기 현재 확진자 수
          gyeonggi_confirmed_person_diff: current[8].cases[1],//경기 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
  
          gangwon_confirmed_person: current[9 ].cases[0],//강원 현재 확진자 수
          gangwon_confirmed_person_diff: current[9].cases[1],//강원 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          chungbuk_confirmed_person: current[10].cases[0],//충북 현재 확진자 수
          chungbuk_confirmed_person_diff: current[10].cases[1],//충북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          chungnam_confirmed_person: current[11].cases[0],//충남 현재 확진자 수
          chungnam_confirmed_person_diff: current[11].cases[1],//충남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          gyeongbuk_confirmed_person: current[12].cases[0],//경북 현재 확진자 수
          gyeongbuk_confirmed_person_diff: current[12].cases[1],//경북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          gyeongnam_confirmed_person: current[13].cases[0],//경남 현재 확진자 수
          gyeongnam_confirmed_person_diff: current[13].cases[1],//경남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          jeonbuk_confirmed_person: current[14].cases[0],//전북 현재 확진자 수
          jeonbuk_confirmed_person_diff: current[14].cases[1],//전북 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          jeonnam_confirmed_person: current[15].cases[0],//전남 현재 확진자 수
          jeonnam_confirmed_person_diff: current[15].cases[1],//전남 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
          
          jeju_confirmed_person: current[16].cases[0],//제주 현재 확진자 수
          jeju_confirmed_person_diff: current[16].cases[1],//제주 diff(어제 이 시간대 확진자 수 - 현재 이 시간대 확진자 수)
      }
  
      let overall = JSON.parse(response.body).overall;
      overall = {
          seoul_total_confirmed_person: overall[0].cases[0], // 서울 총 확진자수
          seoul_yesterday_confirmed_person: overall[0].cases[1], // 서울 어제 확진자수
  
          busan_total_confirmed_person: overall[1].cases[0], // 부산 총 확진자수
          busan_yesterday_confirmed_person: overall[1].cases[1], // 부산 어제 확진자수
  
          incheon_total_confirmed_person: overall[2].cases[0], // 인천 총 확진자수
          incheon_yesterday_confirmed_person: overall[2].cases[1], // 인천 어제 확진자수
  
          daegu_total_confirmed_person: overall[3].cases[0], // 대구 총 확진자수
          daegu_yesterday_confirmed_person: overall[3].cases[1], // 대구 어제 확진자수
          gwangju_total_confirmed_person: overall[4].cases[0], // 광주 총 확진자수
          gwangju_yesterday_confirmed_person: overall[4].cases[1], // 광주 어제 확진자수
  
          daejeon_total_confirmed_person: overall[5].cases[0], // 대전 총 확진자수
          daejeon_yesterday_confirmed_person: overall[5].cases[1], // 대전 어제 확진자수
  
          ulsan_total_confirmed_person: overall[6].cases[0], // 울산 총 확진자수
          ulsan_yesterday_confirmed_person: overall[6].cases[1], // 울산 어제 확진자수
  
          sejong_total_confirmed_person: overall[7].cases[0], // 세종 총 확진자수
          sejong_yesterday_confirmed_person: overall[7].cases[1], // 세종 어제 확진자수
  
          gyeonggi_total_confirmed_person: overall[8].cases[0], // 경기 총 확진자수
          gyeonggi_yesterday_confirmed_person: overall[8].cases[1], // 경기 어제 확진자수
          
          gangwon_total_confirmed_person: overall[9].cases[0], // 강원 총 확진자수
          gangwon_yesterday_confirmed_person: overall[9].cases[1], // 강원 어제 확진자수
          
          chungbuk_total_confirmed_person: overall[10].cases[0], // 충북 총 확진자수
          chungbuk_yesterday_confirmed_person: overall[10].cases[1], // 충북 어제 확진자수
          
          chungnam_total_confirmed_person: overall[11].cases[0], // 충남 총 확진자수
          chungnam_yesterday_confirmed_person: overall[11].cases[1], // 충남 어제 확진자수
          
          gyeongbuk_total_confirmed_person: overall[12].cases[0], // 경북 총 확진자수
          gyeongbuk_yesterday_confirmed_person: overall[12].cases[1], // 경북 어제 확진자수
          
          gyeongnam_total_confirmed_person: overall[13].cases[0], // 경남 총 확진자수
          gyeongnam_yesterday_confirmed_person: overall[13].cases[1], // 경남 어제 확진자수
          
          jeonbuk_total_confirmed_person: overall[14].cases[0], // 전북 총 확진자수
          jeonbuk_yesterday_confirmed_person: overall[14].cases[1], // 전북 어제 확진자수
          
          jeonnam_total_confirmed_person: overall[15].cases[0], // 전남 총 확진자수
          jeonnam_yesterday_confirmed_person: overall[15].cases[1], // 전남 어제 확진자수
          
          jeju_total_confirmed_person: overall[16].cases[0], // 제주 총 확진자수
          jeju_yesterday_confirmed_person: overall[16].cases[1], // 제주 어제 확진자수
      }
  
      let embed = new Discord.MessageEmbed()
      embed.setTitle('코로나')
      embed.setURL('https://corona-live.com')
      embed.setColor('#FF8000')
      embed.setDescription('증상이 있으실 경우 주변 접촉자에게 알리신 후 인근 보건소를 찾아주시기 바랍니다')
      embed.addField(`대한민국 총 확진자수`, `${overview.total_confirmed_person}명`, true)
      embed.addField(`어제 확진자수`, overview.yesterday_confirmed_person + `명`, true)
      embed.addField(`오늘 확진자수(집계중)`, overview.current_confirmed_person + `명`, true)
      embed.addField(`오늘 어제지금시간   -   현재지금시간의 확진자`, overview.current_confirmed_person_diff + `명`, true)
      embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed.addField(`서울`, 'ㅤ')
      embed.addField(`서울 총 확진자수`,  overall.seoul_total_confirmed_person + `명`, true)
      embed.addField(`서울 어제 확진자수`, overall.seoul_yesterday_confirmed_person + `명`, true)
      embed.addField(`서울 오늘 확진자 수(집계중)`, current.seoul_confirmed_person + `명`, true)
      embed.addField(`서울 어제지금시간   -   현재지금시간의 확진자`, current.seoul_confirmed_person_diff,true)
      embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed.addField(`부산` ,'ㅤ')
      embed.addField(`부산 총 확진자수`,  overall.busan_total_confirmed_person + `명`, true)
      embed.addField(`부산 어제 확진자수`, overall.busan_yesterday_confirmed_person + `명`, true)
      embed.addField(`부산 현재 확진자 수(집계중)`, current.busan_confirmed_person + `명`, true)
      embed.addField(`부산 어제지금시간   -   현재지금시간의 확진자`, current.busan_confirmed_person_diff + `명`,true)
      embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed.addField(`대구` ,'ㅤ')
      embed.addField(`대구 총 확진자수`,  overall.daegu_total_confirmed_person + `명`, true)
      embed.addField(`대구 어제 확진자수`, overall.daegu_yesterday_confirmed_person + `명`, true)
      embed.addField(`대구 현재 확진자 수(집계중)`, current.daegu_confirmed_person + `명`, true)
      embed.addField(`대구 어제지금시간   -   현재지금시간의 확진자`, current.daegu_confirmed_person_diff + `명`,true)
      embed.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      let embed2 = new Discord.MessageEmbed()
      embed2.setColor('#FF8000')
      embed2.addField(`광주` ,'ㅤ')
      embed2.addField(`광주 총 확진자수`,  overall.gwangju_total_confirmed_person + `명`, true)
      embed2.addField(`광주 어제 확진자수`, overall.gwangju_yesterday_confirmed_person + `명`, true)
      embed2.addField(`광주 현재 확진자 수(집계중)`, current.gwangju_confirmed_person + `명`, true)
      embed2.addField(`광주 어제지금시간   -   현재지금시간의 확진자`, current.gwangju_confirmed_person_diff + `명`,true)
      embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed2.addField(`대전` ,'ㅤ')
      embed2.addField(`대전 총 확진자수`,  overall.daejeon_total_confirmed_person + `명`, true)
      embed2.addField(`대전 어제 확진자수`, overall.daejeon_yesterday_confirmed_person + `명`, true)
      embed2.addField(`대전 현재 확진자 수(집계중)`, current.daejeon_confirmed_person + `명`, true)
      embed2.addField(`대전 어제지금시간   -   현재지금시간의 확진자`, current.daejeon_confirmed_person_diff + `명`,true)
      embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed2.addField(`울산` ,'ㅤ')
      embed2.addField(`울산 총 확진자수`,  overall.ulsan_total_confirmed_person + `명`, true)
      embed2.addField(`울산 어제 확진자수`, overall.ulsan_yesterday_confirmed_person + `명`, true)
      embed2.addField(`울산 현재 확진자 수(집계중)`, current.ulsan_confirmed_person + `명`, true)
      embed2.addField(`울산 어제지금시간   -   현재지금시간의 확진자`, current.ulsan_confirmed_person_diff + `명`,true)
      embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed2.addField(`세종` ,'ㅤ')
      embed2.addField(`세종 총 확진자수`,  overall.sejong_total_confirmed_person + `명`, true)
      embed2.addField(`세종 어제 확진자수`, overall.sejong_yesterday_confirmed_person + `명`, true)
      embed2.addField(`세종 현재 확진자 수(집계중)`, current.sejong_confirmed_person + `명`, true)
      embed2.addField(`세종 어제지금시간   -   현재지금시간의 확진자`, current.sejong_confirmed_person_diff + `명`,true)
      embed2.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      let embed3 = new Discord.MessageEmbed()
      embed3.setColor('#FF8000')
      embed3.addField(`경기` ,'ㅤ')
      embed3.addField(`경기 총 확진자수`,  overall.gyeonggi_total_confirmed_person + `명`, true)
      embed3.addField(`경기 어제 확진자수`, overall.gyeonggi_yesterday_confirmed_person + `명`, true)
      embed3.addField(`경기 현재 확진자 수(집계중)`, current.gyeonggi_confirmed_person + `명`, true)
      embed3.addField(`경기 어제  지금시간   -   현재지금시간의 확진자`, current.gyeonggi_confirmed_person_diff + `명`,true)
      embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed3.addField(`강원` ,'ㅤ')
      embed3.addField(`강원 총 확진자수`,  overall.gangwon_total_confirmed_person + `명`, true)
      embed3.addField(`강원 어제 확진자수`, overall.gangwon_yesterday_confirmed_person + `명`, true)
      embed3.addField(`강원 현재 확진자 수(집계중)`, current.gangwon_confirmed_person + `명`, true)
      embed3.addField(`강원 어제  지금시간   -   현재지금시간의 확진자`, current.gangwon_confirmed_person_diff + `명`,true)
      embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed3.addField(`충북` ,'ㅤ')
      embed3.addField(`충북 총 확진자수`,  overall.chungbuk_total_confirmed_person + `명`, true)
      embed3.addField(`충북 어제 확진자수`, overall.chungbuk_yesterday_confirmed_person + `명`, true)
      embed3.addField(`충북 현재 확진자 수(집계중)`, current.chungbuk_confirmed_person + `명`, true)
      embed3.addField(`충북 어제  지금시간   -   현재지금시간의 확진자`, current.chungbuk_confirmed_person_diff + `명`,true)
      embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed3.addField(`충남` ,'ㅤ')
      embed3.addField(`충남 총 확진자수`,  overall.chungnam_total_confirmed_person + `명`, true)
      embed3.addField(`충남 어제 확진자수`, overall.chungnam_yesterday_confirmed_person + `명`, true)
      embed3.addField(`충남 현재 확진자 수(집계중)`, current.chungnam_confirmed_person + `명`, true)
      embed3.addField(`충남 어제  지금시간   -   현재지금시간의 확진자`, current.chungnam_confirmed_person_diff + `명`,true)
      embed3.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      let embed4 = new Discord.MessageEmbed()
      embed4.setColor('#FF8000')
      embed4.addField(`경북` ,'ㅤ')
      embed4.addField(`경북 총 확진자수`,  overall.gyeongbuk_total_confirmed_person + `명`, true)
      embed4.addField(`경북 어제 확진자수`, overall.gyeongbuk_yesterday_confirmed_person + `명`, true)
      embed4.addField(`경북 현재 확진자 수(집계중)`, current.gyeongbuk_confirmed_person + `명`, true)
      embed4.addField(`경북 어제  지금시간   -   현재지금시간의 확진자`, current.gyeongbuk_confirmed_person_diff + `명`,true)
      embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed4.addField(`경남` ,'ㅤ')
      embed4.addField(`경남 총 확진자수`,  overall.gyeongnam_total_confirmed_person + `명`, true)
      embed4.addField(`경남 어제 확진자수`, overall.gyeongnam_yesterday_confirmed_person + `명`, true)
      embed4.addField(`경남 현재 확진자 수(집계중)`, current.gyeongnam_confirmed_person + `명`, true)
      embed4.addField(`경남 어제  지금시간   -   현재지금시간의 확진자`, current.gyeongnam_confirmed_person_diff + `명`,true)
      embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed4.addField(`전북` ,'ㅤ')
      embed4.addField(`전북 총 확진자수`,  overall.jeonbuk_total_confirmed_person + `명`, true)
      embed4.addField(`전북 어제 확진자수`, overall.jeonbuk_yesterday_confirmed_person + `명`, true)
      embed4.addField(`전북 현재 확진자 수(집계중)`, current.jeonbuk_confirmed_person + `명`, true)
      embed4.addField(`전북 어제  지금시간   -   현재지금시간의 확진자`, current.jeonbuk_confirmed_person_diff + `명`,true)
      embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      embed4.addField(`전남` ,'ㅤ')
      embed4.addField(`전남 총 확진자수`,  overall.jeonnam_total_confirmed_person + `명`, true)
      embed4.addField(`전남 어제 확진자수`, overall.jeonnam_yesterday_confirmed_person + `명`, true)
      embed4.addField(`전남 현재 확진자 수(집계중)`, current.jeonnam_confirmed_person + `명`, true)
      embed4.addField(`전남 어제  지금시간   -   현재지금시간의 확진자`, current.jeonnam_confirmed_person_diff + `명`,true)
      embed4.addField(`--------------------------------------------------------------------------------------------------`, 'ㅤ')
      let embed5 = new Discord.MessageEmbed()
      embed5.setColor(`#FF8000`)
      embed5.addField(`제주` ,'ㅤ')
      embed5.addField(`제주 총 확진자수`,  overall.jeju_total_confirmed_person + `명`, true)
      embed5.addField(`제주 어제 확진자수`, overall.jeju_yesterday_confirmed_person + `명`, true)
      embed5.addField(`제주 현재 확진자 수(집계중)`, current.jeju_confirmed_person + `명`, true)
      embed5.addField(`제주 어제  지금시간   -   현재지금시간의 확진자`, current.jeju_confirmed_person_diff + `명`,true)
      message.channel.send(embed)
      message.channel.send(embed2)
      message.channel.send(embed3)
      message.channel.send(embed4)
      message.channel.send(embed5)
  })
}
 


});


client.login(token);


//사용 안하는 코드들
  // if(message.content === `🖕`) {
  //   if(message.channel.type === 'dm')
  //   return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  //   message.delete()
  //   message.channel.send(`👁️👃👁️\n🖕👄🖕\n||<@${message.author.id}>||`)
  // }
  // if(message.content == "!!도움") {
  //   if(message.channel.type == 'dm')
  // return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  //   message.channel.send('https://discordjs.guide/additional-info/changes-in-v12.html#string-concatenation')
  // }
  // if(message.content == "!!출첵") {
  //   if(message.channel.type == 'dm')
  // return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  //   message.reply('될줄알았니?')
  // }
  // if(message.content == "!!그리기") {
  //   if(message.channel.type == 'dm')
  // return message.reply('\`dm\`에서 사용할 수 없는 명령어 입니다.')
  //   message.channel.send('https://www.youtube.com/watch?v=2SojPurh_rM')
  // }

 // 현재 명령어 사용 전에 썻던 명령어
//  else if(message.content == "!!명령어") {
//   if(message.channel.type == 'dm')
//   return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
//     let helpImg = '';
//     let commandList = [
//       {name: '!!명령어'   ,   desc: '사용가능한 명령어가 나온다'},
//       {name: '!!비밀도구' ,   desc: '도라에몽의 비밀도구가 랜덤으로 나온다'},
//       {name: '!!주사위'   ,   desc: '1~6사이의 숫자가 랜덤으로 나온다.'},
//       {name: '!!초대코드' ,   desc: '도라에몽을 초대할 수 있는 코드가 나온다'},
//       {name: '!!아바타'   ,   desc: '자신의 프로필이 나온다.'},
//       {name: '!!제작자'   ,   desc: '도라에몽 제작자가 나온다'},
//       {name: '!!핑'       ,   desc: 'pong'}
//     ];
//     let commandStr = '';
//     let embed = new Discord.RichEmbed()
//       .setAuthor('도라에몽 명령어', helpImg)
//       .setColor('#186de6')
//       .setFooter(`도라에몽 BOT ❤️`)
//       .setTimestamp()
    
//     commandList.forEach(x => {
//       commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
//     });

//     embed.addField('명령어: ', commandStr);

//     message.channel.send(embed)
//   }

  // if(message.author.bot) return;
  // if(message.content == "비밀도구") {
  //   if(message.channel.type == 'dm')
  // return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
  //   message.channel.send('이건 없음')
  // }

    // 갑자기 작동 안함
  // if(message.content === '!!서버정보') {
  //   const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
	// 	const members = message.guild.members.cache;
	// 	const channels = message.guild.channels.cache;
	// 	const emojis = message.guild.emojis.cache;

	// 	const embed = new Discord.MessageEmbed()
	// 		.setDescription(`**__${message.guild.name}__ 서버정보**`)
	// 		.setColor("1E90FF")
	// 		.setThumbnail(message.guild.iconURL({ dynamic: true }))
	// 		.addField('정보', [
	// 			`**❯ 이름:** ${message.guild.name}`,
	// 			`**❯ 아이디:** ${message.guild.id}`,
	// 			`**❯ 관리자:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
	// 			`**❯ 지역:** ${message.guild.region}`,
	// 			`**❯ 부스터 티어:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
	// 			`**❯ 필터:** ${filterLevels[message.guild.explicitContentFilter]}`,
	// 			`**❯ 보안 레벨:** ${verificationLevels[message.guild.verificationLevel]}`,
	// 			`**❯ 생성일:** ${moment(message.guild.createdTimestamp).locale('ko').format('ll dddd LTS')} , ${moment(message.guild.createdTimestamp).locale('ko').fromNow()}`,
	// 			'\u200b'
	// 		])
	// 		.addField('통계', [
	// 			`**❯ 역할 수:** ${roles.length}`,
	// 			`**❯ 이모지 수:** ${emojis.size}`,
	// 			`**❯ 일반 이모지 수:** ${emojis.filter(emoji => !emoji.animated).size}`,
	// 			`**❯ 애니매이션 이모지 수:** ${emojis.filter(emoji => emoji.animated).size}`,
	// 			`**❯ 총 맴버 수:** ${message.guild.memberCount}`,
	// 			`**❯ 유저 수:** ${members.filter(member => !member.user.bot).size}`,
	// 			`**❯ 봇 수:** ${members.filter(member => member.user.bot).size}`,
	// 			`**❯ 채팅 채널 수:** ${channels.filter(channel => channel.type === 'text').size}`,
	// 			`**❯ 음성 채널 수:** ${channels.filter(channel => channel.type === 'voice').size}`,
	// 			`**❯ 부스트 수:** ${message.guild.premiumSubscriptionCount || '0'}`,
	// 			'\u200b'
	// 		])
	// 		.addField('상태', [
	// 			`**❯ 온라인:** ${members.filter(member => member.presence.status === 'online').size}`,
	// 			`**❯ 자리비움:** ${members.filter(member => member.presence.status === 'idle').size}`,
	// 			`**❯ 다른 용무 중:** ${members.filter(member => member.presence.status === 'dnd').size}`,
	// 			`**❯ 오프라인:** ${members.filter(member => member.presence.status === 'offline').size}`,
	// 			'\u200b'
	// 		])
	// 		.addField(`역할 [${roles.length - 1}]`, roles.join(', '))
	// 		.setTimestamp();
	// 	message.channel.send(embed);
	// }

  //현재 내정보를 사용하기 전에 사용하던 명령어
    // else if(message.content === "!!내정보") {
  //   if(message.channel.type == 'dm')
  // return message.reply('dm에서 사용할 수 없는 명령어 입니다.')
  //   let img = `${message.author.avatarURL}`
  //   let embed = new Discord.RichEmbed()
  //   .setTitle(message.author.username+"님의 정보")
  //   .setThumbnail(img)
  //   .setColor("RANDOM")
  //   .addField("전체이름", `${message.author.username}#${message.author.discriminator}`, true)
  //   .addField("이름", `${message.author.username}`, true)
  //   .addField("태그", `${message.author.discriminator}`, true)
  //   .addField("아이디",`${message.author.id}`, true)
  //   .addField("프로필링크", `[프로필사진 링크](${message.author.avatarURL})`, true)
  //   .addField("계정 만든날짜", `${message.author.createdAt}`)
  //   .addField("서버 들어온날짜", `${message.member.joinedAt}`)
  // message.channel.send(embed)
  // }

  // if(message.content === '!!돈받기') {
  //   message.channel.send(`||@everyone||\n\`\`농협 356-1430-6858-93 \`\`여기로 매달 \`7,721\` 원을 후원 해주세요.`)
  // }
