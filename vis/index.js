

var svg = d3.select("svg"),
    margin = { left: 30, right: 30, top: 30, bottom: 30 },
    width = +svg.attr("width"),
    height = +svg.attr("height");
svg.attr("class", "graph-svg-component");



var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-40))
    .force("center", d3.forceCenter(width / 2, height / 2));

var graph = svg.append("g")
    .attr("class", "graph");

svg.append("text")
    .attr("class", "title")
    .attr("x", (width / 2))
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "50px")
    .text("Cohesion");


/*
change this to load data from a file
d3.json("output.json", function(error, graph) {
  if (error) throw error;
  // graph construction goes here
}
the graph variable below is just for testing for now
*/
var repo = {"path":"E:\\Programming\\NamorvTech","timeline":[{"commit":"95532c7","datetime":"2018-08-08T02:14:00.000Z","nodes":[],"links":[]},{"commit":"69f6c36","datetime":"2018-08-08T03:18:18.000Z","nodes":[{"id":"Engine","cohesion":0.67}],"links":[]},{"commit":"6df3aff","datetime":"2018-08-10T02:37:44.000Z","nodes":[{"id":"Engine","cohesion":0.44},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.5},{"id":"Shader","cohesion":0.64}],"links":[]},{"commit":"6c7dc6e","datetime":"2018-08-26T09:00:00.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"BaseComponent","cohesion":0.17},{"id":"SpriteComponent","cohesion":0.33},{"id":"Engine","cohesion":0.67},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.5},{"id":"Shader","cohesion":0.57},{"id":"BasicShader","cohesion":1},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Sprite","cohesion":0.47},{"id":"Texture","cohesion":0.4},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.33},{"id":"Vector2","cohesion":0.64},{"id":"Vector3","cohesion":0.44},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"Scene","cohesion":0.25},{"id":"SimObject","cohesion":0.17},{"id":"TestZone","cohesion":1},{"id":"Zone","cohesion":0.22},{"id":"ZoneManager","cohesion":0}],"links":[{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"TestZone","target":"Zone"}]},{"commit":"d51dbf8","datetime":"2018-09-09T03:33:58.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"BaseBehavior","cohesion":0.25},{"id":"BehaviorManager","cohesion":0},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"BaseComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":1},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.33},{"id":"Engine","cohesion":0.67},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.5},{"id":"Shader","cohesion":0.57},{"id":"BasicShader","cohesion":1},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Sprite","cohesion":0.47},{"id":"Texture","cohesion":0.4},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.69},{"id":"Vector3","cohesion":0.61},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"Scene","cohesion":0.25},{"id":"SimObject","cohesion":0.15},{"id":"Zone","cohesion":0.22},{"id":"ZoneManager","cohesion":0}],"links":[{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"}]},{"commit":"3af73b0","datetime":"2018-10-07T04:58:33.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"SoundEffect","cohesion":0.21},{"id":"AudioManager","cohesion":0},{"id":"BaseBehavior","cohesion":0.25},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.25},{"id":"BaseComponent","cohesion":0.22},{"id":"CollisionComponentData","cohesion":1.5},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.25},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.67},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.33},{"id":"Engine","cohesion":0.43},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"Shader","cohesion":0.57},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.48},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Circle2D","cohesion":1},{"id":"Rectangle2D","cohesion":1.08},{"id":"Sprite","cohesion":0.33},{"id":"Texture","cohesion":0.4},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.11},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.68},{"id":"Vector3","cohesion":0.64},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"Scene","cohesion":0.25},{"id":"SimObject","cohesion":0.15},{"id":"Zone","cohesion":0.22},{"id":"ZoneManager","cohesion":0}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"}]},{"commit":"2921ab6","datetime":"2019-01-18T01:44:44.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"SoundEffect","cohesion":0.21},{"id":"AudioManager","cohesion":0},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"PlayerBehaviorData","cohesion":0.8},{"id":"PlayerBehaviorBuilder","cohesion":1},{"id":"PlayerBehavior","cohesion":0.28},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"ScrollBehaviorData","cohesion":0.57},{"id":"ScrollBehaviorBuilder","cohesion":1},{"id":"ScrollBehavior","cohesion":0.35},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.5},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.48},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"Shader","cohesion":0.55},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.37},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":1.13},{"id":"Sprite","cohesion":0.29},{"id":"Texture","cohesion":0.4},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.11},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.64},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"Scene","cohesion":0.25},{"id":"SimObject","cohesion":0.15},{"id":"Zone","cohesion":0.22},{"id":"ZoneManager","cohesion":0}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"PlayerBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"ScrollBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"}]},{"commit":"d7e8140","datetime":"2019-02-18T03:05:47.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"SoundEffect","cohesion":0.21},{"id":"AudioManager","cohesion":0},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"MouseClickBehaviorData","cohesion":1},{"id":"MouseClickBehaviorBuilder","cohesion":1},{"id":"MouseClickBehavior","cohesion":1},{"id":"PlayerBehaviorData","cohesion":0.83},{"id":"PlayerBehaviorBuilder","cohesion":1},{"id":"PlayerBehavior","cohesion":0.32},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"ScrollBehaviorData","cohesion":0.67},{"id":"ScrollBehaviorBuilder","cohesion":1},{"id":"ScrollBehavior","cohesion":0.39},{"id":"VisibilityOnMessageBehaviorData","cohesion":0.67},{"id":"VisibilityOnMessageBehaviorBuilder","cohesion":1},{"id":"VisibilityOnMessageBehavior","cohesion":1.25},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.6},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.5},{"id":"GLUtilities","cohesion":1},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"Shader","cohesion":0.55},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSpriteInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.38},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":0.75},{"id":"Sprite","cohesion":0.29},{"id":"Texture","cohesion":0.4},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.08},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.64},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"Scene","cohesion":0.25},{"id":"SimObject","cohesion":0.14},{"id":"Zone","cohesion":0.22},{"id":"ZoneManager","cohesion":0}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"MouseClickBehavior","target":"BaseBehavior"},{"source":"PlayerBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"ScrollBehavior","target":"BaseBehavior"},{"source":"VisibilityOnMessageBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"}]},{"commit":"7ca3112","datetime":"2019-02-23T03:14:49.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"AudioManager","cohesion":0},{"id":"SoundEffect","cohesion":0.21},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"MouseClickBehaviorData","cohesion":1},{"id":"MouseClickBehaviorBuilder","cohesion":1},{"id":"MouseClickBehavior","cohesion":1},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"VisibilityOnMessageBehaviorData","cohesion":0.67},{"id":"VisibilityOnMessageBehaviorBuilder","cohesion":1},{"id":"VisibilityOnMessageBehavior","cohesion":1.25},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.6},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.5},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"GLUtilities","cohesion":1},{"id":"Shader","cohesion":0.55},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSpriteInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.38},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.3},{"id":"Material","cohesion":0.64},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":0.75},{"id":"Sprite","cohesion":0.31},{"id":"Texture","cohesion":0.42},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.1},{"id":"Matrix4x4","cohesion":0.23},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.65},{"id":"Message","cohesion":0.2},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"TObject","cohesion":0.5},{"id":"Level","cohesion":0.27},{"id":"LevelManager","cohesion":0},{"id":"SceneGraph","cohesion":0.25},{"id":"TEntity","cohesion":0.15}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"MouseClickBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"VisibilityOnMessageBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"},{"source":"TEntity","target":"TObject"}]},{"commit":"9e96a0a","datetime":"2019-04-16T00:34:03.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"AudioConfig","cohesion":0},{"id":"AudioManager","cohesion":0},{"id":"SoundEffect","cohesion":0.21},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"MouseClickBehaviorData","cohesion":1},{"id":"MouseClickBehaviorBuilder","cohesion":1},{"id":"MouseClickBehavior","cohesion":1},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"VisibilityOnMessageBehaviorData","cohesion":0.67},{"id":"VisibilityOnMessageBehaviorBuilder","cohesion":1},{"id":"VisibilityOnMessageBehavior","cohesion":1.25},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.6},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.36},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"GLUtilities","cohesion":1},{"id":"Shader","cohesion":0.55},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSpriteInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.38},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontConfig","cohesion":0},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.28},{"id":"Material","cohesion":0.56},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialConfig","cohesion":0},{"id":"MaterialManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":0.75},{"id":"Sprite","cohesion":0.31},{"id":"Texture","cohesion":0.42},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.1},{"id":"Matrix4x4","cohesion":0.21},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.65},{"id":"Message","cohesion":0.14},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"MessageQueueNode","cohesion":1},{"id":"TObject","cohesion":0.5},{"id":"Renderer","cohesion":0.29},{"id":"RendererViewportCreateInfo","cohesion":1},{"id":"RendererViewport","cohesion":0.31},{"id":"BaseCamera","cohesion":1},{"id":"PerspectiveCamera","cohesion":1},{"id":"Level","cohesion":0.27},{"id":"LevelManager","cohesion":0},{"id":"SceneGraph","cohesion":0.25},{"id":"TEntity","cohesion":0.15}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"MouseClickBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"VisibilityOnMessageBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"},{"source":"BaseCamera","target":"TEntity"},{"source":"PerspectiveCamera","target":"BaseCamera"},{"source":"TEntity","target":"TObject"}]},{"commit":"47c63b4","datetime":"2019-04-24T19:19:38.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"AudioConfig","cohesion":0},{"id":"AudioManager","cohesion":0},{"id":"SoundEffect","cohesion":0.21},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"MouseClickBehaviorData","cohesion":1},{"id":"MouseClickBehaviorBuilder","cohesion":1},{"id":"MouseClickBehavior","cohesion":1},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"VisibilityOnMessageBehaviorData","cohesion":0.67},{"id":"VisibilityOnMessageBehaviorBuilder","cohesion":1},{"id":"VisibilityOnMessageBehavior","cohesion":1.25},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.6},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.36},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"GLUtilities","cohesion":1},{"id":"Shader","cohesion":0.5},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSpriteInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.38},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontConfig","cohesion":0},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.28},{"id":"Material","cohesion":0.42},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialConfig","cohesion":0},{"id":"MaterialManager","cohesion":0},{"id":"ShaderReferenceNode","cohesion":0.5},{"id":"ShaderManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":0.75},{"id":"Sprite","cohesion":0.31},{"id":"Texture","cohesion":0.42},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.1},{"id":"Matrix4x4","cohesion":0.21},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.65},{"id":"Message","cohesion":0.14},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"MessageQueueNode","cohesion":1},{"id":"TObject","cohesion":0.5},{"id":"Renderer","cohesion":0.33},{"id":"RendererViewportCreateInfo","cohesion":1},{"id":"RendererViewport","cohesion":0.31},{"id":"BaseCamera","cohesion":1},{"id":"PerspectiveCamera","cohesion":1},{"id":"Level","cohesion":0.27},{"id":"LevelManager","cohesion":0},{"id":"SceneGraph","cohesion":0.25},{"id":"TEntity","cohesion":0.15}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"MouseClickBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"VisibilityOnMessageBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"},{"source":"BaseCamera","target":"TEntity"},{"source":"PerspectiveCamera","target":"BaseCamera"},{"source":"TEntity","target":"TObject"}]},{"commit":"0845a6c","datetime":"2019-05-13T17:07:06.000Z","nodes":[{"id":"AssetManager","cohesion":0},{"id":"ImageAsset","cohesion":0.33},{"id":"ImageAssetLoader","cohesion":1},{"id":"JsonAsset","cohesion":1},{"id":"JsonAssetLoader","cohesion":1},{"id":"TargaHeader","cohesion":0.67},{"id":"TargaProcessor","cohesion":1},{"id":"TextAsset","cohesion":1},{"id":"TextAssetLoader","cohesion":1},{"id":"AudioConfig","cohesion":0},{"id":"AudioManager","cohesion":0},{"id":"SoundEffect","cohesion":0.21},{"id":"BaseBehavior","cohesion":0.2},{"id":"BehaviorManager","cohesion":0},{"id":"KeyboardMovementBehaviorData","cohesion":1},{"id":"KeyboardMovementBehaviorBuilder","cohesion":1},{"id":"KeyboardMovementBehavior","cohesion":2.5},{"id":"MouseClickBehaviorData","cohesion":1},{"id":"MouseClickBehaviorBuilder","cohesion":1},{"id":"MouseClickBehavior","cohesion":1},{"id":"RotationBehaviorData","cohesion":0.5},{"id":"RotationBehaviorBuilder","cohesion":1},{"id":"RotationBehavior","cohesion":1},{"id":"VisibilityOnMessageBehaviorData","cohesion":0.67},{"id":"VisibilityOnMessageBehaviorBuilder","cohesion":1},{"id":"VisibilityOnMessageBehavior","cohesion":1.25},{"id":"CollisionData","cohesion":1},{"id":"CollisionManager","cohesion":0},{"id":"AnimatedSpriteComponentData","cohesion":1},{"id":"AnimatedSpriteComponentBuilder","cohesion":1},{"id":"AnimatedSpriteComponent","cohesion":0.17},{"id":"BaseComponent","cohesion":0.19},{"id":"BitmapTextComponentData","cohesion":0.75},{"id":"BitmapTextComponentBuilder","cohesion":1},{"id":"BitmapTextComponent","cohesion":0.6},{"id":"CollisionComponentData","cohesion":1.33},{"id":"CollisionComponentBuilder","cohesion":1},{"id":"CollisionComponent","cohesion":0.22},{"id":"ComponentManager","cohesion":0},{"id":"SpriteComponentData","cohesion":0.8},{"id":"SpriteComponentBuilder","cohesion":1},{"id":"SpriteComponent","cohesion":0.56},{"id":"Engine","cohesion":0.38},{"id":"AttributeInfo","cohesion":1},{"id":"GLBuffer","cohesion":0.44},{"id":"GLUtilities","cohesion":1},{"id":"Shader","cohesion":0.5},{"id":"BasicShader","cohesion":1},{"id":"UVInfo","cohesion":1},{"id":"AnimatedSpriteInfo","cohesion":1},{"id":"AnimatedSprite","cohesion":0.38},{"id":"FontUtilities","cohesion":1},{"id":"FontGlyph","cohesion":0},{"id":"BitmapFont","cohesion":0.23},{"id":"BitmapFontConfig","cohesion":0},{"id":"BitmapFontManager","cohesion":0},{"id":"BitmapText","cohesion":0.21},{"id":"Color","cohesion":0.28},{"id":"Material","cohesion":0.42},{"id":"MaterialReferenceNode","cohesion":0.5},{"id":"MaterialConfig","cohesion":0},{"id":"MaterialManager","cohesion":0},{"id":"ShaderReferenceNode","cohesion":0.5},{"id":"ShaderManager","cohesion":0},{"id":"Circle2D","cohesion":0.92},{"id":"Rectangle2D","cohesion":0.75},{"id":"Sprite","cohesion":0.31},{"id":"Texture","cohesion":0.42},{"id":"TextureReferenceNode","cohesion":0.5},{"id":"TextureManager","cohesion":0},{"id":"Vertex","cohesion":0.17},{"id":"MouseContext","cohesion":1},{"id":"InputManager","cohesion":0.1},{"id":"Matrix4x4","cohesion":0.21},{"id":"Transform","cohesion":0.22},{"id":"Vector2","cohesion":0.73},{"id":"Vector3","cohesion":0.65},{"id":"Message","cohesion":0.14},{"id":"MessageBus","cohesion":0},{"id":"MessageSubscriptionNode","cohesion":1},{"id":"MessageQueueNode","cohesion":1},{"id":"TObject","cohesion":0.5},{"id":"Renderer","cohesion":0.43},{"id":"RendererViewportCreateInfo","cohesion":1},{"id":"RendererViewport","cohesion":0.31},{"id":"RenderView","cohesion":1},{"id":"BaseCamera","cohesion":1},{"id":"PerspectiveCamera","cohesion":1},{"id":"Level","cohesion":0.27},{"id":"LevelManager","cohesion":0},{"id":"SceneGraph","cohesion":0.25},{"id":"TEntity","cohesion":0.15}],"links":[{"source":"KeyboardMovementBehavior","target":"BaseBehavior"},{"source":"MouseClickBehavior","target":"BaseBehavior"},{"source":"RotationBehavior","target":"BaseBehavior"},{"source":"VisibilityOnMessageBehavior","target":"BaseBehavior"},{"source":"AnimatedSpriteComponentData","target":"SpriteComponentData"},{"source":"AnimatedSpriteComponent","target":"BaseComponent"},{"source":"BitmapTextComponent","target":"BaseComponent"},{"source":"CollisionComponent","target":"BaseComponent"},{"source":"SpriteComponent","target":"BaseComponent"},{"source":"BasicShader","target":"Shader"},{"source":"AnimatedSprite","target":"Sprite"},{"source":"BaseCamera","target":"TEntity"},{"source":"PerspectiveCamera","target":"BaseCamera"},{"source":"TEntity","target":"TObject"}]}]}

var commits = repo.timeline.map(function (coms) { return new Date(coms.datetime).toLocaleString('en-GB', { timeZone: 'UTC' }, { dateStyle: "short" }, { timeSytle: "short" }) }).reverse();
var maxIdx = commits.length - 1;

// draw the first commit graph when the page loads
drawGraph(repo.timeline[0]);
drawLegend();

// timeline
var slider = d3
    .sliderRight()
    .min(0)
    .max(maxIdx)
    .step(1)
    .width(0)
    .height(height * 0.7)
    .tickFormat(function (d, i) { return commits[i] })
    .ticks(commits.length)
    .default(maxIdx)
    .handle(
        d3.symbol()
            .type(d3.symbolCircle)
            .size(100)
    )
    .on('onchange', val => {
        drawGraph(repo.timeline[maxIdx - val])
    });

svg
    .append("g")
    .attr("class", "timeline")
    .attr("transform", "translate(" + margin.left + "," + 3 * margin.top + ")")
    .call(slider);


simulation.tick()



// draw graph
function drawGraph(graph) {
    svg.selectAll(".links").remove();
    svg.selectAll(".nodes").remove();
    svg.selectAll(".labels").remove();

    // draw links
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line");

    // draw nodes
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 10)
        .style("fill", function (n) {
            return d3.interpolateBlues(n.cohesion);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    simulation
        .nodes(graph.nodes)
        .on("tick", update);

    simulation.alphaTarget(0.3).restart();


    simulation.force("link")
        .links(graph.links)
        .distance(function (l) {
            return 250;
        });

    var text = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter()
        .append("text");

    var textLabels = text
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .text(function (d) { return d.id })
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("text-anchor", "middle");

    // update elements on mouse drag
    function update() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

        textLabels
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y - 15; })

    }

    // utitlity functions for mouse drag
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function drawLegend() {

    // legend
    var legendblock = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(860, 60)");

    var legend = legendblock.append("g")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.interpolateBlues(1));

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.interpolateBlues(0));

    legendblock.append("rect")
        .attr("width", 30)
        .attr("height", 300)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
        .range([300, 0])
        .domain([0, 1]);

    var yAxis = d3.axisRight(y);

    legendblock.append("g")
        .attr("class", "legend-label")
        .attr("transform", "translate(41,10)")
        .call(yAxis).append("text")
        .attr("color", "black")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("c o h e s i o n");
}