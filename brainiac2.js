var config = {
    type: Phaser.AUTO,
    width: 1425,
    height: 550,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#ebebeb'
};

var game = new Phaser.Game(config);

var currBox1 = null;
var currBox2 = null;
var snapBox = null;
var snap = false;
var currCar = 0;
var isMuted = false;
var switchSd, switchConfig, sdConfig;
var endText;
var showEndText = false;

var carousel = new Phaser.Structs.List();

var spritesList = new Phaser.Structs.List();
var spritesMap = new Phaser.Structs.List();

var boxesList = new Phaser.Structs.List();
var boxMap = new Phaser.Structs.Map();

var soundList = new Phaser.Structs.List();
var soundMap = new Phaser.Structs.Map();

var leftButton, rightButton, soundOnButton, soundOffButton;
var boxA, boxB, boxC, boxD, boxE, boxF, boxG, boxH, boxI, boxJ, border;

var macSd, smkSd, crtSd, gunSd, eyeSd, hrtSd, brnSd, tvsSd, tubSd, porSd;
var crtSd2, eyeSd2, tvsSd2, tubSd2, porSd2, porSd3;
var mac, smk, crt, gun, eye, hrt, brn, por, tvs, tub;

var macV0, macV1, macV2, macV3, macV4, macV5, macV6;
var smkV1, smkV2, smkV3, smkV4, smkV5, smkV6, smkV7, smkV8;
var crtV1, crtV2;
var gunV1, gunV2;
var eyeV0, eyeV1, eyeV2, eyeV3, eyeV4, eyeV5, eyeV6, eyeV7;
var hrtV1, hrtV2, hrtV3, hrtV4, hrtV5;
var brnV1, brnV2, brnV3, brnV4, brnV5
var porV1, porV2, porV3;
var tvsV1, tvsV2, tvsV3, tvsV4;
var tubV1, tubV2, tubV3;

var macList = new Phaser.Structs.List();
var smkList = new Phaser.Structs.List();
var crtList = new Phaser.Structs.List();
var gunList = new Phaser.Structs.List();
var eyeList = new Phaser.Structs.List();
var hrtList = new Phaser.Structs.List();
var brnList = new Phaser.Structs.List();
var porList = new Phaser.Structs.List();
var tvsList = new Phaser.Structs.List();
var tubList = new Phaser.Structs.List();

function preload ()
{
    //preloader
    this.load.on('complete', function(){
        console.log('done loading!');
        var loading = document.getElementById('loading');
        loading.parentNode.removeChild(loading);
    });

    //load sounds
    this.load.audio('switch', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/switch.mp3');
    this.load.audio('macSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/macSd.wav');
    this.load.audio('hrtSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/hrtSd.wav');
    this.load.audio('brnSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/brnSd.wav');
    this.load.audio('eyeSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/eyeSd.wav');
    this.load.audio('smkSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/smkSd.wav');
    this.load.audio('crtSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/crtSd.wav');
    this.load.audio('crtSd2', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/crtSd2.wav');
    this.load.audio('gunSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/gunSd.wav');
    this.load.audio('tvsSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/tvsSd.wav');
    this.load.audio('tvsSd2', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/tvsSd2.wav');
    this.load.audio('tubSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/tubSd.wav');
    this.load.audio('tubSd2', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/tubSd2.wav');
    this.load.audio('porSd', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/porSd.wav');
    this.load.audio('porSd2', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/porSd2.wav');
    this.load.audio('porSd3', 'https://github.com/elonskolnik/Brainiac/blob/main/assets/sound/porSd3.wav');

    //load buttons
    this.load.image('leftButton', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6d6fe15fd078dce8aee_leftArrow.png');
    this.load.image('rightButton', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6d6465210dd449aaab0_rightArrow.png');
    this.load.image('soundon', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6d631f5ba32374860ce_soundoff.png');
    this.load.image('soundoff', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6d70ee421517ec6cf3e_soundon.png');

    //load gray boxes
    this.load.image('bABGH', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d695dad9dd50e43b45df_borderABGH.png');
    this.load.image('bCF', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d695cc5cb213497c8c54_borderCF.png');
    this.load.image('bDE', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6945363d33bd6486c80_borderDE.png');
    this.load.image('bIJ', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6958dcdcebc3522438b_borderIJ.png');
    this.load.image('border', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6957f807d7f86986fbf_borderFull.png');

    //load machine
    this.load.image('mac', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a608faac70f40faff_mac.png');
    this.load.spritesheet('macV0', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63bc4987500db7c5f1d_macV0.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d64431f5ba8d2b4857e0_macV1.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d644c4b4b5fdc04ec9cf_macV2.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d643608faa282440fc39_macV3.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d64439c0418fe204dce0_macV4.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV5', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d64540f9a0a3e8b2bd78_macV5.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('macV6', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6458dcdce897d223e5a_macV6.png', {frameWidth: 200, frameHeight: 275});

    //load smoke
    this.load.image('smk', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63ab5fdaf5c081fb982_smk.png');
    this.load.spritesheet('smkV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63b39c0415c8b04dcad_smkv1.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d645465210593c9aa29c_smkV2.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63b0a674000cd087e12_smkV3.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63ac0fdb50b920f069e_smkV4.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV5', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63b9075d99a36d4190d_smkV5.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV6', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a9075d9499bd4190b_smkV6.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV7', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a608faa533a40fb00_smkV7.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('smkV8', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a5363d381214868cc_smkV8.png', {frameWidth: 200, frameHeight: 275});

    //load carts
    this.load.image('crt', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63718500518f54dcf04_crt.png');
    this.load.spritesheet('crtV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63718500582ec4dcf05_crtV1.png', {frameWidth: 275, frameHeight: 100});
    this.load.spritesheet('crtV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63aaf95112c018b4cb4_crtV2.png', {frameWidth: 275, frameHeight: 100});

    //load fingergun
    this.load.image('gun', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63723f94dd3e39c25db_gun.png');
    this.load.spritesheet('gunV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d637c0f7f38473acd53a_gunV1.png', {frameWidth: 275, frameHeight: 175});
    this.load.spritesheet('gunV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63ac0fdb52cb80f069d_gunV2.png', {frameWidth: 275, frameHeight: 175});
    
    //load eyeBlocks
    this.load.image('eye', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d637faee5b8124e07bfd_eye.png');
    this.load.spritesheet('eyeV0', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63799038e42257cb568_eyeV0.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d644fd63be0fa7e3f2ff_eyeV1.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6450ee421527bc6c708_eyeV2.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63ac4b4b518994ec91c_eyeV3.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6399075d9ce18d418d3_eyeV4.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV5', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d645abb26803536acb23_eyeV5.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV6', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a5363d31c404868cd_eyeV6.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('eyeV7', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d645fab3d2dd6c8c52a5_eyeV7.png', {frameWidth: 200, frameHeight: 275});

    //load heart
    this.load.image('hrt', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a3bf43d7298663938_hrt.png');
    this.load.spritesheet('hrtV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d645dad9dd3fa73b42ab_hrtV1.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('hrtV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63b2cf2813582d1bd06_hrtV2.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('hrtV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63cdad9dd00143b4283_hrtV3.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('hrtV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a0ee421ac01c6c621_hrtV4.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('hrtV5', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6441850053f074dcf88_hrtV5.png', {frameWidth: 275, frameHeight: 275});

     //load brain
    this.load.image('brn', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63649fe5f4ae361da88_brn.png');
    this.load.spritesheet('brnV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a9075d91541d4190c_brnV1.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('brnV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63accdd286263dbf803_brnV2.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('brnV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a3bf43dc00b663973_brnV3.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('brnV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63bc4f3f207429da035_brnV4.png', {frameWidth: 275, frameHeight: 275});
    this.load.spritesheet('brnV5', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63bd8adde0a1ec9f0ce_brnV5.png', {frameWidth: 275, frameHeight: 275});

    //load portals
    this.load.image('por', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63a2cf2815951d1bd01_por.png');
    this.load.spritesheet('porV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d64339c04156f304dcd5_porV1.png', {frameWidth: 275, frameHeight: 100});
    this.load.spritesheet('porV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d64346521091219aa21a_porV2.png', {frameWidth: 275, frameHeight: 100});
    this.load.spritesheet('porV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d644b5fdaf1a4d1fbab4_porV3.png', {frameWidth: 275, frameHeight: 100});

    //load tvs
    this.load.image('tvs', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d635abb26892246aca0c_tvs.png');
    this.load.spritesheet('tvsV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63699038e64107cb55b_tvsV1.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('tvsV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6360a67406bc2087e09_tvsV2.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('tvsV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d636682072f856626dc4_tvsV3.png', {frameWidth: 200, frameHeight: 275});
    this.load.spritesheet('tvsV4', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d636c99cf48a01b2502c_tvsV4.png', {frameWidth: 200, frameHeight: 275});

    //load tube
    this.load.image('tub', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d635abb2685f006aca0b_tub.png');
    this.load.spritesheet('tubV1', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d63649fe5f877361da89_tubV1.png', {frameWidth: 275, frameHeight: 175});
    this.load.spritesheet('tubV2', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d6367f807d5ac3985608_tubV2.png', {frameWidth: 275, frameHeight: 175});
    this.load.spritesheet('tubV3', 'https://uploads-ssl.webflow.com/63e530686f211b120ea271c6/6410d636cc5cb26ac77c8ae8_tubV3.png', {frameWidth: 275, frameHeight: 175});
}

function create ()
{    
    //set sounds
    switchSd = this.sound.add('switch');
    macSd = this.sound.add('macSd', {volume: 0.7});
    hrtSd = this.sound.add('hrtSd', {volume: 1.0});
    brnSd = this.sound.add('brnSd', {volume: 0.5});
    smkSd = this.sound.add('smkSd', {volume: 1.0});
    eyeSd = this.sound.add('eyeSd', {volume: 0.2});
    gunSd = this.sound.add('gunSd', {volume: 0.5});
    crtSd = this.sound.add('crtSd', {volume: 0.7});
    crtSd2 = this.sound.add('crtSd2', {volume: 0.4});
    tvsSd = this.sound.add('tvsSd', {volume: 0.2});
    tvsSd2 = this.sound.add('tvsSd2', {volume: 0.2});
    tubSd = this.sound.add('tubSd', {volume: 0.2});
    tubSd2 = this.sound.add('tubSd2', {volume: 0.4});
    porSd = this.sound.add('porSd', {volume: 0.6});
    porSd2 = this.sound.add('porSd2', {volume: 0.6});
    porSd3 = this.sound.add('porSd3', {volume: 0.6});
    
    //set sound config
    switchConfig = {
        mute: false,
        volume: 0.4,
        loop: false
    };

    sdConfig = {
       mute: false,
       loop: true,
       delay: 0
    };

    //set text
    endText = this.add.text(1020, 230, 'Try swapping\nsome pieces\n around!').setOrigin(0,0);
    endText.setColor(0x434343);
    endText.setFontSize(24);
    endText.setAlign('center');
    //endText.setFontStyle('bold');
    endText.setVisible(false);
    
    //set boxes
    boxA = this.add.image(0, 0, 'bABGH').setOrigin(0,0);
    boxB = this.add.image(0, 275, 'bABGH').setOrigin(0,0);
    boxC = this.add.image(200, 0, 'bCF').setOrigin(0,0);
    boxD = this.add.image(200, 275, 'bDE').setOrigin(0,0);
    boxE = this.add.image(475, 0, 'bDE').setOrigin(0,0);
    boxF = this.add.image(475, 175, 'bCF').setOrigin(0,0);
    boxG = this.add.image(750, 0, 'bABGH').setOrigin(0,0);
    boxH = this.add.image(750, 275, 'bABGH').setOrigin(0,0);
    boxI = this.add.image(200, 450, 'bIJ').setOrigin(0,0);
    boxJ = this.add.image(475, 450, 'bIJ').setOrigin(0,0);
    border = this.add.image(0, 0, 'border').setOrigin(0,0);

    boxesList.add(boxA);
    boxesList.add(boxB);
    boxesList.add(boxC);
    boxesList.add(boxD);
    boxesList.add(boxE);
    boxesList.add(boxF);
    boxesList.add(boxG);
    boxesList.add(boxH);
    boxesList.add(boxI);
    boxesList.add(boxJ);     

    //set box map
    boxMap = new Map([
        [boxA, null],
        [boxB, null],  
        [boxC, null],
        [boxD, null],
        [boxE, null],
        [boxF, null],
        [boxG, null],
        [boxH, null],
        [boxI, null],
        [boxJ, null]
    ]);

    //set sprites map
    spritesMap = new Map([
        [mac, null],
        [smk, null],
        [crt, null],
        [gun, null],
        [eye, null],
        [hrt, null],
        [brn, null],
        [por, null],
        [tvs, null],
        [tub, null]
    ]);

    //set sound map
    soundMap = new Map([
        [mac, null],
        [smk, null],
        [crt, null],
        [gun, null],
        [eye, null],
        [hrt, null],
        [brn, null],
        [por, null],
        [tvs, null],
        [tub, null]
    ]);

    //set images

    //set machine
    mac = this.add.image(0, 0, 'mac').setOrigin(0,0).setInteractive();
    mac.setVisible(false);
    mac.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    mac.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(mac);
    macList.add(mac);
    mac.x = getPicX(mac);
    mac.y = getPicY(mac);

    //set smoke
    smk = this.add.image(0, 0, 'smk').setOrigin(0,0).setInteractive();
    smk.setVisible(false);
    smk.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    smk.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(smk);
    smkList.add(smk);
    smk.x = getPicX(smk);
    smk.y = getPicY(smk);

    //set eyeBlocks
    eye = this.add.image(0, 0, 'eye').setOrigin(0,0).setInteractive();
    eye.setVisible(false);

    eye.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    eye.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(eye);
    eyeList.add(eye);
    eye.x = getPicX(eye);
    eye.y = getPicY(eye);

    //set tvs
    tvs = this.add.image(0, 0, 'tvs').setOrigin(0,0).setInteractive();
    tvs.setVisible(false);

    tvs.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    tvs.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(tvs);
    tvsList.add(tvs);
    tvs.x = getPicX(tvs);
    tvs.y = getPicY(tvs);

    //set carts
    crt = this.add.image(0, 0, 'crt').setOrigin(0,0).setInteractive();
    crt.setVisible(false);
    crt.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    crt.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(crt);
    crtList.add(crt);
    crt.x = getPicX(crt);
    crt.y = getPicY(crt);

    //set portals
    por = this.add.image(0, 0, 'por').setOrigin(0,0).setInteractive();
    por.setVisible(false);

    por.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    por.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(por);
    porList.add(por);
    por.x = getPicX(por);
    por.y = getPicY(por);

    //set gun
    gun = this.add.image(0, 0, 'gun').setOrigin(0,0).setInteractive();
    gun.setVisible(false);

    gun.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    gun.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(gun);
    gunList.add(gun);
    gun.x = getPicX(gun);
    gun.y = getPicY(gun);

    //set tube
    tub = this.add.image(0, 0, 'tub').setOrigin(0,0).setInteractive();
    tub.setVisible(false);

    tub.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    tub.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(tub);
    tubList.add(tub);
    tub.x = getPicX(tub);
    tub.y = getPicY(tub);

    //set hrt
    hrt = this.add.image(0, 0, 'hrt').setOrigin(0,0).setInteractive();
    hrt.setVisible(false);

    hrt.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    hrt.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(hrt);
    hrtList.add(hrt);
    hrt.x = getPicX(hrt);
    hrt.y = getPicY(hrt);

    //set brn
    brn = this.add.image(0, 0, 'brn').setOrigin(0,0).setInteractive();
    
    //brn.setVisible(false); //todo: delete this line

    brn.on('pointerover', function(){
        this.setTint(0xd1d1d1);
    });
    brn.on('pointerout', function(){
        this.clearTint();
    });
    this.input.setDraggable(brn);
    brnList.add(brn);
    brn.x = getPicX(brn);
    brn.y = getPicY(brn);

    //set carousel
    carousel.add(brn);
    carousel.add(mac);
    carousel.add(crt);
    carousel.add(tvs);
    carousel.add(tub);  
    carousel.add(smk);
    carousel.add(por);
    carousel.add(eye);
    carousel.add(hrt);
    carousel.add(gun);
    
    //set up buttons
    leftButton = this.add.image(1040, 430, 'leftButton').setScale(0.25).setOrigin(0,0);
    leftButton.setInteractive();
    leftButton.on('pointerover', function(){
        if(carousel.length>1){
            this.setTint(0x505050);
        }
    });
    leftButton.on('pointerout', function(){
        this.clearTint();
    });
    leftButton.on('pointerdown', () => flipImageLeft());

    rightButton = this.add.image(1123, 430, 'rightButton').setScale(0.25).setOrigin(0,0);
    rightButton.setInteractive();
    rightButton.on('pointerover', function(){
        if(carousel.length>1){
            this.setTint(0x505050);
        }
    });
    rightButton.on('pointerout', function(){
        this.clearTint();
    });
    rightButton.on('pointerdown', () => flipImageRight());

    soundOffButton = this.add.image(1070, 30, 'soundoff').setOrigin(0,0);
    soundOffButton.setInteractive();
    soundOffButton.on('pointerover', function(){
        this.setTint(0xd1d1d1);  
    });
    soundOffButton.on('pointerout', function(){
        this.clearTint();  
    });
    soundOffButton.setVisible(false);
    soundOffButton.on('pointerdown', () => mute());

    soundOnButton = this.add.image(1070, 30, 'soundon').setOrigin(0,0);
    soundOnButton.setInteractive();
    soundOnButton.on('pointerover', function(){
        this.setTint(0xd1d1d1);  
    });
    soundOnButton.on('pointerout', function(){
        this.clearTint();  
    });
    soundOnButton.on('pointerdown', () => mute());

    //set animations

    //macv0
    this.anims.create({
        key:'macV0',
        frames: this.anims.generateFrameNumbers('macV0'),
        frameRate: 12,
        repeat: -1
    });

    macV0 = this.add.sprite(0, 0, 'macV0').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV0);
    macV0.setVisible(false);
    macV0.anims.play('macV0');

    macList.add(macV0);

    //macv1
    this.anims.create({
        key:'macV1',
        frames: this.anims.generateFrameNumbers('macV1'),
        frameRate: 12,
        repeat: -1
    });

    macV1 = this.add.sprite(0, 0, 'macV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV1);
    macV1.setVisible(false);
    macV1.anims.play('macV1');

    macList.add(macV1);

    //macv2
    this.anims.create({
        key:'macV2',
        frames: this.anims.generateFrameNumbers('macV2'),
        frameRate: 12,
        repeat: -1
    });

    macV2 = this.add.sprite(0, 0, 'macV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV2);
    macV2.setVisible(false);
    macV2.anims.play('macV2');

    macList.add(macV2);

    //macv3
    this.anims.create({
        key:'macV3',
        frames: this.anims.generateFrameNumbers('macV3'),
        frameRate: 12,
        repeat: -1
    });

    macV3 = this.add.sprite(0, 0, 'macV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV3);
    macV3.setVisible(false);
    macV3.anims.play('macV3');

    macList.add(macV3);

    //macv4
    this.anims.create({
        key:'macV4',
        frames: this.anims.generateFrameNumbers('macV4'),
        frameRate: 12,
        repeat: -1
    });

    macV4 = this.add.sprite(0, 0, 'macV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV4);
    macV4.setVisible(false);
    macV4.anims.play('macV4');

    macList.add(macV4);

    //macv5
    this.anims.create({
        key:'macV5',
        frames: this.anims.generateFrameNumbers('macV5'),
        frameRate: 12,
        repeat: -1
    });

    macV5 = this.add.sprite(0, 0, 'macV5').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV5);
    macV5.setVisible(false);
    macV5.anims.play('macV5');

    macList.add(macV5);

    //macv6
    this.anims.create({
        key:'macV6',
        frames: this.anims.generateFrameNumbers('macV6'),
        frameRate: 12,
        repeat: -1
    });

    macV6 = this.add.sprite(0, 0, 'macV6').setOrigin(0,0).setInteractive();
    this.input.setDraggable(macV6);
    macV6.setVisible(false);
    macV6.anims.play('macV6');

    macList.add(macV6);

    //smkv1
    this.anims.create({
        key:'smkV1',
        frames: this.anims.generateFrameNumbers('smkV1'),
        frameRate: 12,
        repeat: -1
    });

    smkV1 = this.add.sprite(0, 0, 'smkV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV1);
    smkV1.setVisible(false);
    smkV1.anims.play('smkV1');

    smkList.add(smkV1);

    //smkv2
    this.anims.create({
        key:'smkV2',
        frames: this.anims.generateFrameNumbers('smkV2'),
        frameRate: 12,
        repeat: -1
    });

    smkV2 = this.add.sprite(0, 0, 'smkV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV2);
    smkV2.setVisible(false);
    smkV2.anims.play('smkV2');

    smkList.add(smkV2);

    //smkv3
    this.anims.create({
        key:'smkV3',
        frames: this.anims.generateFrameNumbers('smkV3'),
        frameRate: 12,
        repeat: -1
    });

    smkV3 = this.add.sprite(0, 0, 'smkV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV3);
    smkV3.setVisible(false);
    smkV3.anims.play('smkV3');

    smkList.add(smkV3);

    //smkv4
    this.anims.create({
        key:'smkV4',
        frames: this.anims.generateFrameNumbers('smkV4'),
        frameRate: 12,
        repeat: -1
    });

    smkV4 = this.add.sprite(0, 0, 'smkV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV4);
    smkV4.setVisible(false);
    smkV4.anims.play('smkV4');

    smkList.add(smkV4);

    //smkv5
    this.anims.create({
        key:'smkV5',
        frames: this.anims.generateFrameNumbers('smkV5'),
        frameRate: 12,
        repeat: -1
    });

    smkV5 = this.add.sprite(0, 0, 'smkV5').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV5);
    smkV5.setVisible(false);
    smkV5.anims.play('smkV5');

    smkList.add(smkV5);

    //smkv6
    this.anims.create({
        key:'smkV6',
        frames: this.anims.generateFrameNumbers('smkV6'),
        frameRate: 12,
        repeat: -1
    });

    smkV6 = this.add.sprite(0, 0, 'smkV6').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV6);
    smkV6.setVisible(false);
    smkV6.anims.play('smkV6');

    smkList.add(smkV6);

    //smkv7
    this.anims.create({
        key:'smkV7',
        frames: this.anims.generateFrameNumbers('smkV7'),
        frameRate: 12,
        repeat: -1
    });

    smkV7 = this.add.sprite(0, 0, 'smkV7').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV7);
    smkV7.setVisible(false);
    smkV7.anims.play('smkV7');

    smkList.add(smkV7);

    //smkv8
    this.anims.create({
        key:'smkV8',
        frames: this.anims.generateFrameNumbers('smkV8'),
        frameRate: 12,
        repeat: -1
    });

    smkV8 = this.add.sprite(0, 0, 'smkV8').setOrigin(0,0).setInteractive();
    this.input.setDraggable(smkV8);
    smkV8.setVisible(false);
    smkV8.anims.play('smkV8');

    smkList.add(smkV8);
            
    //crtv1
    this.anims.create({
        key:'crtV1',
        frames: this.anims.generateFrameNumbers('crtV1'),
        frameRate: 12,
        repeat: -1
    });

    crtV1 = this.add.sprite(0, 0, 'crtV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(crtV1);
    crtV1.setVisible(false);
    crtV1.anims.play('crtV1');

    crtList.add(crtV1);

    //crtv2
    this.anims.create({
        key:'crtV2',
        frames: this.anims.generateFrameNumbers('crtV2'),
        frameRate: 12,
        repeat: -1
    });

    crtV2 = this.add.sprite(0, 0, 'crtV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(crtV2);
    crtV2.setVisible(false);
    crtV2.anims.play('crtV2');

    crtList.add(crtV2);

    //gunv1
    this.anims.create({
        key:'gunV1',
        frames: this.anims.generateFrameNumbers('gunV1'),
        frameRate: 12,
        repeat: -1
    });

    gunV1 = this.add.sprite(0, 0, 'gunV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(gunV1);
    gunV1.setVisible(false);
    gunV1.anims.play('gunV1');

    gunList.add(gunV1);

    //gunv2
    this.anims.create({
        key:'gunV2',
        frames: this.anims.generateFrameNumbers('gunV2'),
        frameRate: 12,
        repeat: -1
    });

    gunV2 = this.add.sprite(0, 0, 'gunV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(gunV2);
    gunV2.setVisible(false);
    gunV2.anims.play('gunV2');

    gunList.add(gunV2);

     //eyev0
    this.anims.create({
        key:'eyeV0',
        frames: this.anims.generateFrameNumbers('eyeV0'),
        frameRate: 12,
        repeat: -1
    });

    eyeV0 = this.add.sprite(0, 0, 'eyeV0').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV0);
    eyeV0.setVisible(false);
    eyeV0.anims.play('eyeV0');

    eyeList.add(eyeV0);

    //eyev1
    this.anims.create({
        key:'eyeV1',
        frames: this.anims.generateFrameNumbers('eyeV1'),
        frameRate: 12,
        repeat: -1
    });

    eyeV1 = this.add.sprite(0, 0, 'eyeV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV1);
    eyeV1.setVisible(false);
    eyeV1.anims.play('eyeV1');

    eyeList.add(eyeV1);

    //eyev2
    this.anims.create({
        key:'eyeV2',
        frames: this.anims.generateFrameNumbers('eyeV2'),
        frameRate: 12,
        repeat: -1
    });

    eyeV2 = this.add.sprite(0, 0, 'eyeV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV2);
    eyeV2.setVisible(false);
    eyeV2.anims.play('eyeV2');

    eyeList.add(eyeV2);

    //eyev3
    this.anims.create({
        key:'eyeV3',
        frames: this.anims.generateFrameNumbers('eyeV3'),
        frameRate: 12,
        repeat: -1
    });

    eyeV3 = this.add.sprite(0, 0, 'eyeV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV3);
    eyeV3.setVisible(false);
    eyeV3.anims.play('eyeV3');

    eyeList.add(eyeV3);

    //eyev4
    this.anims.create({
        key:'eyeV4',
        frames: this.anims.generateFrameNumbers('eyeV4'),
        frameRate: 12,
        repeat: -1
    });

    eyeV4 = this.add.sprite(0, 0, 'eyeV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV4);
    eyeV4.setVisible(false);
    eyeV4.anims.play('eyeV4');

    eyeList.add(eyeV4);

    //eyev5
    this.anims.create({
        key:'eyeV5',
        frames: this.anims.generateFrameNumbers('eyeV5'),
        frameRate: 12,
        repeat: -1
    });

    eyeV5 = this.add.sprite(0, 0, 'eyeV5').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV5);
    eyeV5.setVisible(false);
    eyeV5.anims.play('eyeV5');

    eyeList.add(eyeV5);

    //eyev6
    this.anims.create({
        key:'eyeV6',
        frames: this.anims.generateFrameNumbers('eyeV6'),
        frameRate: 12,
        repeat: -1
    });

    eyeV6 = this.add.sprite(0, 0, 'eyeV6').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV6);
    eyeV6.setVisible(false);
    eyeV6.anims.play('eyeV6');

    eyeList.add(eyeV6);

    //eyev7
    this.anims.create({
        key:'eyeV7',
        frames: this.anims.generateFrameNumbers('eyeV7'),
        frameRate: 12,
        repeat: -1
    });

    eyeV7 = this.add.sprite(0, 0, 'eyeV7').setOrigin(0,0).setInteractive();
    this.input.setDraggable(eyeV7);
    eyeV7.setVisible(false);
    eyeV7.anims.play('eyeV7');

    eyeList.add(eyeV7);

    //hrtv1
    this.anims.create({
        key:'hrtV1',
        frames: this.anims.generateFrameNumbers('hrtV1'),
        frameRate: 12,
        repeat: -1
    });

    hrtV1 = this.add.sprite(0, 0, 'hrtV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(hrtV1);
    hrtV1.setVisible(false);
    hrtV1.anims.play('hrtV1');

    hrtList.add(hrtV1);

    //hrtv2
    this.anims.create({
        key:'hrtV2',
        frames: this.anims.generateFrameNumbers('hrtV2'),
        frameRate: 12,
        repeat: -1
    });

    hrtV2 = this.add.sprite(0, 0, 'hrtV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(hrtV2);
    hrtV2.setVisible(false);
    hrtV2.anims.play('hrtV2');

    hrtList.add(hrtV2);

    //hrtv3
    this.anims.create({
        key:'hrtV3',
        frames: this.anims.generateFrameNumbers('hrtV3'),
        frameRate: 12,
        repeat: -1
    });

    hrtV3 = this.add.sprite(0, 0, 'hrtV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(hrtV3);
    hrtV3.setVisible(false);
    hrtV3.anims.play('hrtV3');

    hrtList.add(hrtV3);

    //hrtv4
    this.anims.create({
        key:'hrtV4',
        frames: this.anims.generateFrameNumbers('hrtV4'),
        frameRate: 12,
        repeat: -1
    });

    hrtV4 = this.add.sprite(0, 0, 'hrtV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(hrtV4);
    hrtV4.setVisible(false);
    hrtV4.anims.play('hrtV4');

    hrtList.add(hrtV4);

    //hrtv5
    this.anims.create({
        key:'hrtV5',
        frames: this.anims.generateFrameNumbers('hrtV5'),
        frameRate: 12,
        repeat: -1
    });

    hrtV5 = this.add.sprite(0, 0, 'hrtV5').setOrigin(0,0).setInteractive();
    this.input.setDraggable(hrtV5);
    hrtV5.setVisible(false);
    hrtV5.anims.play('hrtV5');

    hrtList.add(hrtV5);

    //brnv1
    this.anims.create({
        key:'brnV1',
        frames: this.anims.generateFrameNumbers('brnV1'),
        frameRate: 12,
        repeat: -1
    });

    brnV1 = this.add.sprite(0, 0, 'brnV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(brnV1);
    brnV1.setVisible(false);
    brnV1.anims.play('brnV1');

    brnList.add(brnV1);

    //brnv2
    this.anims.create({
        key:'brnV2',
        frames: this.anims.generateFrameNumbers('brnV2'),
        frameRate: 12,
        repeat: -1
    });

    brnV2 = this.add.sprite(0, 0, 'brnV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(brnV2);
    brnV2.setVisible(false);
    brnV2.anims.play('brnV2');

    brnList.add(brnV2);

    //brnv3
    this.anims.create({
        key:'brnV3',
        frames: this.anims.generateFrameNumbers('brnV3'),
        frameRate: 12,
        repeat: -1
    });

    brnV3 = this.add.sprite(0, 0, 'brnV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(brnV3);
    brnV3.setVisible(false);
    brnV3.anims.play('brnV3');

    brnList.add(brnV3);

    //brnv4
    this.anims.create({
        key:'brnV4',
        frames: this.anims.generateFrameNumbers('brnV4'),
        frameRate: 12,
        repeat: -1
    });

    brnV4 = this.add.sprite(0, 0, 'brnV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(brnV4);
    brnV4.setVisible(false);
    brnV4.anims.play('brnV4');

    brnList.add(brnV4);

    //brnv5
    this.anims.create({
        key:'brnV5',
        frames: this.anims.generateFrameNumbers('brnV5'),
        frameRate: 12,
        repeat: -1
    });

    brnV5 = this.add.sprite(0, 0, 'brnV5').setOrigin(0,0).setInteractive();
    this.input.setDraggable(brnV5);
    brnV5.setVisible(false);
    brnV5.anims.play('brnV5');

    brnList.add(brnV5);

    //porv1
    this.anims.create({
        key:'porV1',
        frames: this.anims.generateFrameNumbers('porV1'),
        frameRate: 12,
        repeat: -1
    });

    porV1 = this.add.sprite(0, 0, 'porV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(porV1);
    porV1.setVisible(false);
    porV1.anims.play('porV1');

    porList.add(porV1);

    //porv2
    this.anims.create({
        key:'porV2',
        frames: this.anims.generateFrameNumbers('porV2'),
        frameRate: 12,
        repeat: -1
    });

    porV2 = this.add.sprite(0, 0, 'porV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(porV2);
    porV2.setVisible(false);
    porV2.anims.play('porV2');

    porList.add(porV2);

    //porv3
    this.anims.create({
        key:'porV3',
        frames: this.anims.generateFrameNumbers('porV3'),
        frameRate: 12,
        repeat: -1
    });

    porV3 = this.add.sprite(0, 0, 'porV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(porV3);
    porV3.setVisible(false);
    porV3.anims.play('porV3');

    porList.add(porV3);

    //tvsv1
    this.anims.create({
        key:'tvsV1',
        frames: this.anims.generateFrameNumbers('tvsV1'),
        frameRate: 12,
        repeat: -1
    });

    tvsV1 = this.add.sprite(0, 0, 'tvsV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tvsV1);
    tvsV1.setVisible(false);
    tvsV1.anims.play('tvsV1');

    tvsList.add(tvsV1);

    //tvsv2
    this.anims.create({
        key:'tvsV2',
        frames: this.anims.generateFrameNumbers('tvsV2'),
        frameRate: 12,
        repeat: -1
    });

    tvsV2 = this.add.sprite(0, 0, 'tvsV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tvsV2);
    tvsV2.setVisible(false);
    tvsV2.anims.play('tvsV2');

    tvsList.add(tvsV2);

    //tvsv3
    this.anims.create({
        key:'tvsV3',
        frames: this.anims.generateFrameNumbers('tvsV3'),
        frameRate: 12,
        repeat: -1
    });

    tvsV3 = this.add.sprite(0, 0, 'tvsV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tvsV3);
    tvsV3.setVisible(false);
    tvsV3.anims.play('tvsV3');

    tvsList.add(tvsV3);

    //tvsv4
    this.anims.create({
        key:'tvsV4',
        frames: this.anims.generateFrameNumbers('tvsV4'),
        frameRate: 12,
        repeat: -1
    });

    tvsV4 = this.add.sprite(0, 0, 'tvsV4').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tvsV4);
    tvsV4.setVisible(false);
    tvsV4.anims.play('tvsV4');

    tvsList.add(tvsV4);

    //tubv1
    this.anims.create({
        key:'tubV1',
        frames: this.anims.generateFrameNumbers('tubV1'),
        frameRate: 12,
        repeat: -1
    });

    tubV1 = this.add.sprite(0, 0, 'tubV1').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tubV1);
    tubV1.setVisible(false);
    tubV1.anims.play('tubV1');

    tubList.add(tubV1);

    //tubv2
    this.anims.create({
        key:'tubV2',
        frames: this.anims.generateFrameNumbers('tubV2'),
        frameRate: 12,
        repeat: -1
    });

    tubV2 = this.add.sprite(0, 0, 'tubV2').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tubV2);
    tubV2.setVisible(false);
    tubV2.anims.play('tubV2');

    tubList.add(tubV2);

    //tubv3
    this.anims.create({
        key:'tubV3',
        frames: this.anims.generateFrameNumbers('tubV3'),
        frameRate: 12,
        repeat: -1
    });

    tubV3 = this.add.sprite(0, 0, 'tubV3').setOrigin(0,0).setInteractive();
    this.input.setDraggable(tubV3);
    tubV3.setVisible(false);
    tubV3.anims.play('tubV3');

    tubList.add(tubV3);

    //set drag behaviors
    this.input.on('dragstart', function (pointer, gameObject){
        gameObject.setTint(0xd1d1d1);
        gameObject.setDepth(200);
        showAllBoxes(true);
        setDragBoxes(gameObject);
        snap = false;
        setDragStart(gameObject);
    }, this);

    this.input.on('drag', function(pointer, gameObject, dragX, dragY){
        gameObject.x = dragX;
        gameObject.y = dragY;
        var otherSprite = getOtherSprite(getPic(gameObject));
        if(otherSprite != null){
            if(checkDist(gameObject, otherSprite)){
                otherSprite.setTint(0xd1d1d1);     
            }
            else{
                otherSprite.clearTint();        
            }
        }

        if(checkDist(gameObject, boxB) || checkDist(gameObject, boxH)){
             if(smkList.exists(gameObject) || eyeList.exists(gameObject)){
                gameObject.setTint(0xffc4c4);     
             }
        }

       else if(checkDist(gameObject, boxA) || checkDist(gameObject, boxG)){
             if(macList.exists(gameObject) || tvsList.exists(gameObject)){
                gameObject.setTint(0xffc4c4);        
             }
       }

       else{
             gameObject.setTint(0xd1d1d1);         
        }
        
    });

    this.input.on('dragend', function(pointer, gameObject){
        //check snap
        if(checkDist(gameObject, currBox1)){
            snap = true;
            snapBox = currBox1;
        }

        else if(checkDist(gameObject, currBox2)){
            snap = true;
            snapBox = currBox2;
        }

        if(snap){
            if(!showEndText){
                if(carousel.length == 0){
                    endText.setVisible(true);
                    showEndText = true;
                }        
            }
            gameObject.setDepth(0);
            showAllBoxes(false);

            if(boxMap.get(snapBox) != null){
                var thisPic = getPic(gameObject);
                swap(thisPic, snapBox);
            }

            gameObject.x = snapBox.x;
            gameObject.y = snapBox.y; 
            switchSd.play(switchConfig);
            var tempSprite = null;
                
            if(macList.exists(gameObject)){
                macSprite(gameObject);
                tempSprite = mac;
            }

            else if(smkList.exists(gameObject)){
                smkSprite(gameObject);
                tempSprite = smk;
            }

            else if(crtList.exists(gameObject)){
                crtSprite(gameObject);    
                tempSprite = crt;
            }

            else if(gunList.exists(gameObject)){
                gunSprite(gameObject);  
                tempSprite = gun;
            }

            else if(eyeList.exists(gameObject)){
                eyeSprite(gameObject); 
                tempSprite = eye;
            }
            else if(hrtList.exists(gameObject)){
                hrtSprite(gameObject);  
                tempSprite = hrt;
            }

            else if(brnList.exists(gameObject)){
                brnSprite(gameObject);
                tempSprite = brn;
            }

            else if(porList.exists(gameObject)){
                porSprite(gameObject);  
                tempSprite = por;
            }

            else if(tvsList.exists(gameObject)){
                tvsSprite(gameObject);
                tempSprite = tvs;
            }

            else{
                tubSprite(gameObject);
                tempSprite = tub;
            }

            boxMap.set(snapBox, tempSprite);
            checkAllSprites();
            resetSprites();
        }

        else{
           gameObject.setVisible(false);
           if(carousel.length>0){
               carousel.getAt(currCar).setVisible(false);
               currCar = carousel.length;
           }
           else{
               currCar = 0;     
           }
           var thisPic = getPic(gameObject);
           carousel.add(thisPic);
           
           thisPic.x = getPicX(thisPic);
           thisPic.y = getPicY(thisPic);
           carousel.getAt(currCar).setVisible(true);
        }
        showAllBoxes(false);
        gameObject.clearTint();
      
    }.bind(this));
}

function setDragBoxes(gameObjectIn)
{
   if(macList.exists(gameObjectIn)||tvsList.exists(gameObjectIn)){
        currBox1 = boxB;
        currBox2 = boxH;
    }
    else if(smkList.exists(gameObjectIn)||eyeList.exists(gameObjectIn)){
        currBox1 = boxA;
        currBox2 = boxG;
    }
    else if(crtList.exists(gameObjectIn)||porList.exists(gameObjectIn)){
        currBox1 = boxI;
        currBox2 = boxJ;
    }
    else if(gunList.exists(gameObjectIn)||tubList.exists(gameObjectIn)){
        currBox1 = boxD;
        currBox2 = boxE;
    }
    else if(brnList.exists(gameObjectIn)||hrtList.exists(gameObjectIn)){
        currBox1 = boxC;
        currBox2 = boxF;
    }
}

function showAllBoxes(input)
{
     for(i = 0; i < boxesList.length; i++){ 
        boxesList.getAt(i).setVisible(input);
        boxesList.getAt(i).setDepth(100);
     }
     border.setVisible(input);
}

function macSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = macSd;

    if(checkDist(gameObjectIn, boxB)){
          if(boxMap.get(boxD) === tub){
                if(boxMap.get(boxI) === crt){
                    tempSprite = macV1;           
                }
                else{
                    tempSprite = macV2;           
                }
          }

          else if(boxMap.get(boxD) === gun){
                if(boxMap.get(boxI) === crt){
                    tempSprite = macV3;              
                }        
                else{
                    tempSprite = macV4;           
                }
          }

          else{
            tempSprite = macV0;
          }
    }

    else { //boxH
          if(boxMap.get(boxJ) === crt){
                tempSprite = macV5;     
          }
          else {
                tempSprite = macV6;     
          }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(mac, tempSprite);
}

function smkSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = smkSd;
    
    if(checkDist(gameObjectIn, boxA)){
        if(boxMap.get(boxB) === mac){
            tempSprite = smkV2;     
        }
        else{
            tempSprite = smkV5;     
        }
    }

    else{ //if boxG
        if(boxMap.get(boxH) === mac){
            if(boxMap.get(boxE) === gun){
                tempSprite = smkV3;        
            }   
            else if(boxMap.get(boxE) === tub){
                tempSprite = smkV7;        
            }
            else{
                tempSprite = smkV1;        
            }
        }
        else{
            if(boxMap.get(boxE) === gun){
                tempSprite = smkV4;        
            }  
            else if(boxMap.get(boxE) === tub){
                tempSprite = smkV8;        
            }
            else{
                tempSprite = smkV6;      
            }
        }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(smk, tempSprite);
}

function crtSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = crtSd;

    if(checkDist(gameObjectIn, boxJ)){
        if(boxMap.get(boxF) === brn){
            tempSprite = crtV2;
            tempSound = crtSd2;
        }  
        else{
            tempSprite = crtV1;     
        }
    }
    else{
        tempSprite = crtV1;  
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(crt, tempSprite);
}

function gunSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = gunSd;

    if(checkDist(gameObjectIn, boxD)){
        if(boxMap.get(boxC) === brn){
            tempSprite = gunV2;     
        }
        else{
            tempSprite = gunV1;     
        }
    }

    else{
        tempSprite = gunV1;  
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(gun, tempSprite);
}

function eyeSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = eyeSd;

    if(checkDist(gameObjectIn, boxA)){
        if(boxMap.get(boxB) === mac){
            tempSprite = eyeV1;     
        }
        else{
            tempSprite = eyeV3;
            tempSound = eyeSd; //change to eyeSd2
        }
    }

    else{ //boxG
        if(boxMap.get(boxH) === mac){
            if(boxMap.get(boxE) === gun){
                tempSprite = eyeV2;        
            }
            else if(boxMap.get(boxE) === tub){
                tempSprite = eyeV5;      
            }
            else{
                tempSprite = eyeV7;        
            }
        }
        else{
            if(boxMap.get(boxE) === gun){
                tempSprite = eyeV4;        
            }     
            else if(boxMap.get(boxE) === tub){
                tempSprite = eyeV6;        
            }
            else{
                tempSprite = eyeV0;        
            }
        }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(eye, tempSprite);
}

function hrtSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = hrtSd;

    if(checkDist(gameObjectIn, boxC)){
        if(boxMap.get(boxE) === gun){
            tempSprite = hrtV1;     
        }
        else{
            tempSprite = hrtV2;     
        }
    }

    else { //box F
        if(boxMap.get(boxD) === gun){
            tempSprite = hrtV4;     
        }
        else if(boxMap.get(boxD) === tub){
            tempSprite = hrtV3;     
        }
        else{
            tempSprite = hrtV5;     
        }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(hrt, tempSprite);
}

function brnSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = brnSd;

    if(checkDist(gameObjectIn, boxC)){
        if(boxMap.get(boxE) === gun){
            tempSprite = brnV1;     
        }  
        else{
            tempSprite = brnV2;     
        }
    }

    else{ //box F
        if(boxMap.get(boxD) === gun){
            tempSprite = brnV3;    
        }
        else if(boxMap.get(boxD) === tub){
            tempSprite = brnV4;     
        }
        else{
            tempSprite = brnV5;     
        }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(brn, tempSprite);
}

function porSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = null;

    if(checkDist(gameObjectIn, boxJ)){
        if(boxMap.get(boxF) === brn){
            tempSprite = porV3;
            tempSound = porSd3;
        }  
        else{
            tempSprite = porV2;
            tempSound = porSd2;
        }
    }

    else{ //box I
        tempSprite = porV1;
        tempSound = porSd;
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(por, tempSprite);
}

function tvsSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = tvsSd;

    if(checkDist(gameObjectIn, boxB)){
        if(boxMap.get(boxD) === gun){
            tempSprite = tvsV2;
            tempSound = tvsSd2;
        }  
        else if(boxMap.get(boxD) === tub){
            tempSprite = tvsV1;     
        }
        else{
            tempSprite = tvsV4;     
        }
    }
    
    else { //boxH
        tempSprite = tvsV3;
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(tvs, tempSprite);
}

function tubSprite(gameObjectIn){
    var tempSprite = null;
    var tempSound = tubSd;

    if(checkDist(gameObjectIn, boxD)){
        if(boxMap.get(boxC) === brn){
            tempSprite = tubV1;
            tempSound = tubSd2;
        }
        else{
            tempSprite = tubV3;     
        }
    }

    else{ //box E
        if(boxMap.get(boxG) === smk){
            tempSprite = tubV3;     
        }
        else{
            tempSprite = tubV2;
        }
    }

    setSprite(gameObjectIn, tempSprite, tempSound);
    spritesMap.set(tub, tempSprite);
}

function setSprite(gameObjectIn, spriteIn, soundIn)
{
    if(!(gameObjectIn === spriteIn)){
        gameObjectIn.setVisible(false);
    }
    spriteIn.x = gameObjectIn.x;
    spriteIn.y = gameObjectIn.y;
    spriteIn.setVisible(true);
    if(spritesList.exists(gameObjectIn)){
        spritesList.remove(gameObjectIn);  
    }
    spritesList.add(spriteIn);

    if(soundIn != null){
        var oldSound = soundMap.get(getPic(gameObjectIn));
        if(oldSound != soundIn && oldSound != null){
            soundList.remove(oldSound);
            oldSound.stop();
        }
        soundList.add(soundIn);
        
        var thisPic = getPic(gameObjectIn);
        soundMap.set(thisPic, soundIn);
        if(!isMuted){
            soundIn.play(sdConfig);
        }
    }
}

function checkAllSprites(){
    if(spritesMap.get(mac)){
        macSprite(spritesMap.get(mac));  
    }

    if(spritesMap.get(smk)){
        smkSprite(spritesMap.get(smk));  
    }

    if(spritesMap.get(crt)){
        crtSprite(spritesMap.get(crt));  
    }

    if(spritesMap.get(gun)){
        gunSprite(spritesMap.get(gun));  
    }

    if(spritesMap.get(eye)){
        eyeSprite(spritesMap.get(eye));  
    }

    if(spritesMap.get(hrt)){
        hrtSprite(spritesMap.get(hrt));  
    }

    if(spritesMap.get(brn)){
        brnSprite(spritesMap.get(brn));  
    }

    if(spritesMap.get(por)){
        porSprite(spritesMap.get(por));  
    }

    if(spritesMap.get(tvs)){
        tvsSprite(spritesMap.get(tvs));  
    }

    if(spritesMap.get(tub)){
        tubSprite(spritesMap.get(tub));  
    }         
}

function resetSprites()
{
    for(i = 0; i < spritesList.length; i++){
        spritesList.getAt(i).anims.restart();
        if(soundList.getAt(i) != null){
            soundList.getAt(i).stop();
            if(!isMuted){
                soundList.getAt(i).play(sdConfig);
            }
        }
    }
}

function setDragStart(gameObjectIn)
{
    if(carousel.exists(gameObjectIn)){
        if(currCar == carousel.length-1){
            currCar -= 1;     
        }
        carousel.remove(gameObjectIn);
        if(carousel.length>0){
            carousel.getAt(currCar).setVisible(true);
        }
    }

    var thisPic = getPic(gameObjectIn);

    //clear the box in the map if it is moved
    if(boxMap.get(currBox1) === thisPic){
        boxMap.set(currBox1, null);
    }
    else if(boxMap.get(currBox2) === thisPic){
        boxMap.set(currBox2, null);  
    }

    spritesMap.set(thisPic, null);

    var thisSound = soundMap.get(thisPic);
    if(thisSound != null){
        thisSound.stop();
        soundList.remove(thisSound);
    }
    soundMap.set(thisPic, null);

    //switch sprite to still image
    /*gameObjectIn.setVisible(false);
    thisPic.x = gameObjectIn.x;
    thisPic.y = gameObjectIn.y;
    thisPic.setVisible(true);*/
}

function swap(picIn, boxIn){
    var otherBox = null;

    endText.setVisible(false);  

    //swap box
    if(boxIn === boxA){
        otherBox = boxG; 
    }		
    else if(boxIn === boxB){
        otherBox = boxH;
    }
    else if(boxIn === boxC){
        otherBox = boxF;
    }
    else if(boxIn === boxD){
        otherBox = boxE;
    }
    else if(boxIn === boxE){
        otherBox = boxD;
    }
    else if(boxIn === boxF){
        otherBox = boxC;
    }
    else if(boxIn === boxG){
        otherBox = boxA;
    }
    else if(boxIn === boxH){
        otherBox = boxB;
    }
    else if(boxIn === boxI){
        otherBox = boxJ;  
    }
    else{
        otherBox = boxI;  
    }

    var otherSprite = getOtherSprite(picIn);
    otherSprite.clearTint();
    otherSprite.x = otherBox.x;
    otherSprite.y = otherBox.y;
    var otherPic = getPic(otherSprite);
    boxMap.set(otherBox, otherPic);
}

function getOtherSprite(picIn){
    var otherSprite = null;

    if(picIn === mac){
        otherSprite = spritesMap.get(tvs);
    }
    else if(picIn === tvs){
        otherSprite = spritesMap.get(mac); 
    }
    else if(picIn === smk){
        otherSprite = spritesMap.get(eye);
    }
    else if(picIn === eye){
        otherSprite = spritesMap.get(smk); 
    }
    else if(picIn === brn){
        otherSprite = spritesMap.get(hrt);
    }
    else if(picIn === hrt){
        otherSprite = spritesMap.get(brn);
    }
    else if(picIn === crt){
        otherSprite = spritesMap.get(por); 
    }
    else if(picIn === por){
        otherSprite = spritesMap.get(crt); 
    }
    else if(picIn === gun){
        otherSprite = spritesMap.get(tub); 
    }
    else{
        otherSprite = spritesMap.get(gun); 
    }
    return otherSprite;
}

function getPic(gameObjectIn){
    var tempSprite = null;
    if(macList.exists(gameObjectIn)){
        tempSprite = mac;
    }

    else if(smkList.exists(gameObjectIn)){
        tempSprite = smk;  
    }

    else if(crtList.exists(gameObjectIn)){
        tempSprite = crt;   
    }

    else if(gunList.exists(gameObjectIn)){
        tempSprite = gun;    
    }

    else if(eyeList.exists(gameObjectIn)){
        tempSprite = eye;    
    }
    else if(hrtList.exists(gameObjectIn)){
        tempSprite = hrt;    
    }

    else if(brnList.exists(gameObjectIn)){
        tempSprite = brn;
    }

    else if(porList.exists(gameObjectIn)){
        tempSprite = por;          
    }

    else if(tvsList.exists(gameObjectIn)){
        tempSprite = tvs;         
    }

    else if(tubList.exists(gameObjectIn)){
        tempSprite = tub;  
    }
    return tempSprite;
}

function getPicX(gameObjectIn){
    var x = 0;

    if(gameObjectIn === mac || gameObjectIn === smk || gameObjectIn === eye || gameObjectIn === tvs){
        x = 1010;
    }
    else if(gameObjectIn === gun || gameObjectIn === tub){ //gun or tub or por or crt or brn or hrt
        x = 975;
    }
    else if(gameObjectIn === por || gameObjectIn === crt){
        x = 975;  
    }
    else{ //hrt or brn
        x = 975;  
    }
    return x;
}

function getPicY(gameObjectIn){
    var y = 0;

    if(gameObjectIn === mac || gameObjectIn === smk || gameObjectIn === eye || gameObjectIn === tvs){
         y = 130;
    }
    else if(gameObjectIn === crt || gameObjectIn === por){
        y = 220;
    }
    else if(gameObjectIn === hrt || gameObjectIn === brn){
        y = 130;  
    }
    else{ //gun or tub
        y = 175;
    }
    return y;
}

function flipImageLeft(){
    if(carousel.length>0){
        carousel.getAt(currCar).setVisible(false);
        if(currCar == 0){
              currCar = carousel.length-1;
        }
        else{
            currCar -= 1;  
        }
        carousel.getAt(currCar).setVisible(true);
    }
}

function flipImageRight(){
    if(carousel.length>0){
        carousel.getAt(currCar).setVisible(false);
        if(currCar == carousel.length-1){
              currCar = 0;
        }
        else{
            currCar += 1;  
        }
        carousel.getAt(currCar).setVisible(true);
    }
}

function checkDist(objA, objB){
    if(objB == "carousel"){
          if(objA.getCenter().x > 1000){
            return true;
          }
          else{
            return false;     
          }
    } 

    if(objA.getCenter().x < objB.getCenter().x+90 && objA.getCenter().x > objB.getCenter().x-90){
        if(objA.getCenter().y < objB.getCenter().y+90 && objA.getCenter().y > objB.getCenter().y-90){
            return true;
        }
    }
    else{
        return false;  
    }
}

function mute(){
    soundOffButton.setVisible(!isMuted);
    soundOnButton.setVisible(isMuted);

    if(!isMuted){
         game.sound.stopAll();
         isMuted = true;
    }
    else{
        isMuted = false;  
        resetSprites();
    }
}

function update(){};
