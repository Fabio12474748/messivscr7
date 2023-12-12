var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["48180bd8-3870-417e-a06a-6de8869c3556","cb90d59f-8ffb-4355-88e0-22ae78f3870d"],"propsByKey":{"48180bd8-3870-417e-a06a-6de8869c3556":{"sourceSize":{"x":273,"y":185},"frameSize":{"x":273,"y":185},"frameCount":1,"frameDelay":4,"name":"cr7.png","sourceUrl":"assets/v3/animations/WtsIiyqPJ5BgLvNF-wOdL4Fq11niF6iP47EJKhK5t64/48180bd8-3870-417e-a06a-6de8869c3556.png","size":10158,"version":"aIlRfW7kzmX.J8RD0a7YN_r.CS.hnZM9","categories":[""],"looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/v3/animations/WtsIiyqPJ5BgLvNF-wOdL4Fq11niF6iP47EJKhK5t64/48180bd8-3870-417e-a06a-6de8869c3556.png"},"cb90d59f-8ffb-4355-88e0-22ae78f3870d":{"sourceSize":{"x":552,"y":552},"frameSize":{"x":552,"y":552},"frameCount":1,"frameDelay":12,"name":"messi.png","sourceUrl":null,"size":25285,"version":"swXTcvYiLDXzDiQtxWJAHnjq9sXvKFBs","categories":[""],"looping":true,"loadedFromSource":true,"saved":true,"rootRelativePath":"assets/cb90d59f-8ffb-4355-88e0-22ae78f3870d.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var goal1;
var goal2;

var boundary1;
var boundary2;
var boundary3;
var boundary4;

var striker;

var playerMallet;
var computerMallet;

var playerScore = 0;
var compScore = 0;

var gameState = " ";

function setup() {
  createCanvas(windowWidth, windowHeight);

  goal1 = createSprite(width / 2, 18, width, 20);
  goal1.shapeColor = "yellow";

  goal2 = createSprite(width / 2, height - 18, width, 20);
  goal2.shapeColor = "yellow";

  boundary1 = createSprite(width / 2, 0, width, 0);
  boundary1.shapeColor = "white";

  boundary2 = createSprite(width / 2, height, width, 10);
  boundary2.shapeColor = "white";

  boundary3 = createSprite(0, height / 2, 10, height);
  boundary3.shapeColor = "white";

  boundary4 = createSprite(width, height / 2, 10, height);
  boundary4.shapeColor = "white";

  striker = createSprite(width / 2, height / 2, 10, 10);
  striker.shapeColor = "white";

  playerMallet = createSprite(width / 2, height / 10, 50, 10);
  playerMallet.shapeColor = "black";
  playerMallet.setAnimation("cr7.png");
  playerMallet.scale = 0.25;
  
  computerMallet = createSprite(width / 2, height - height / 10, 50, 10);
  computerMallet.shapeColor = "black";
  computerMallet.setAnimation("messi.png");
computerMallet.scale = 0.25;
}

function draw() {
  background("green");

  if (gameState == " ") {
    textSize(18);
    fill("maroon");
    text("Pressione espaço para começar", width / 3, height / 1.5);

    if (keyDown("space")) {
      serve();
      gameState = "";
    }
  }

  textSize(18);
  fill("maroon");
  text(compScore, 25, height - 25);
  text(playerScore, 25, 25);

  if (striker.isTouching(goal1)) {
    compScore = compScore + 1;
    resetStriker();
  }

  if (striker.isTouching(goal2)) {
    playerScore = playerScore + 1;
    resetStriker();
  }

  if (playerScore == 5 || compScore == 5) {
    fill("maroon");
    textSize(18);
    text("Game Over!", width / 3, height / 2);
  }

  paddleMovement();

  computerMallet.x = striker.x;

  for (var i = 0; i < width; i = i + 20) {
    line(i, height / 2, i + 10, height / 2);
  }

  striker.bounceOff(boundary1);
  striker.bounceOff(boundary2);
  striker.bounceOff(boundary3);
  striker.bounceOff(boundary4);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(boundary3);
  playerMallet.bounceOff(boundary4);
  computerMallet.bounceOff(boundary3);
  computerMallet.bounceOff(boundary4);

  drawSprites();
}

function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
}

function paddleMovement() {
  if (keyDown("left")) {
    playerMallet.x = playerMallet.x - 10;
  }

  if (keyDown("right")) {
    playerMallet.x = playerMallet.x + 10;
  }

  if (keyDown("up")) {
    if (playerMallet.y > height / 10) {
      playerMallet.y = playerMallet.y - 10;
    }
  }

  if (keyDown("down")) {
    if (playerMallet.y < height / 2 - 10) {
      playerMallet.y = playerMallet.y + 10;
    }
  }
}

function resetStriker() {
  striker.x = width / 2;
  striker.y = height / 2;
  striker.velocityX = 0;
  striker.velocityY = 0;

  setTimeout(function () {
    serve();
  }, 1000);
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
