var X_OFFSET = 200;
var Y_OFFSET = 100;
var HEIGHT = 200;
var WIDTH = 300;
var ROWS = 4;
var COLS = 6;
var BGCOLOR = "#FFFFFF"
window.onload = function() {
    var canvas = document.getElementById("stage");
    var ctx = canvas.getContext('2d');
    var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
    function drawGrid() {
        ctx.fillStyle = BGCOLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var x=0; x<=ROWS; x++) {
           ctx.moveTo(X_OFFSET, Y_OFFSET + x * HEIGHT / ROWS);
           ctx.lineTo(X_OFFSET + WIDTH, Y_OFFSET + x * HEIGHT / ROWS);
        }
        for (var x=0; x<=COLS; x++) {
            ctx.moveTo(X_OFFSET + x * WIDTH / COLS, Y_OFFSET);
            ctx.lineTo(X_OFFSET + x * WIDTH / COLS, Y_OFFSET + HEIGHT);
        }
        ctx.closePath()
        ctx.stroke();
    }
    drawGrid();
    function visualCountGenerator() {
        var count = 0;
        for (var size = Math.min(ROWS,COLS); size > 0; --size) {
            console.log('size: ' + size + '  color: ' + colors[size]);
            for (var row = 0; row <= ROWS - size; ++row) {
                for (var col = 0; col <= COLS - size; ++col) {
                    ++count;
                    drawGrid();
                    ctx.strokeStyle = colors[size%6];
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    console.log( col * WIDTH / COLS, row * HEIGHT / ROWS, size * WIDTH / COLS, size * HEIGHT / ROWS );
                    ctx.rect(X_OFFSET + col * WIDTH / COLS,
                             Y_OFFSET + row * HEIGHT / ROWS,
                             size * WIDTH / COLS,
                             size * HEIGHT / ROWS);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fillStyle = "#000000";
                    ctx.font = "30px san-serif";
                    ctx.textBaseline = "top";
                    ctx.fillText('Count: ' + count, 0, 0);
                    yield count;
                }
            }
        }
        drawGrid()
        ctx.fillStyle = "#FF0000";
        ctx.font = "30px san-serif";
        ctx.textBaseline = "top";
        ctx.fillText('Count: ' + count, 0, 0);
        yield count;
    };
    var counter = visualCountGenerator();
    var id = setInterval(function() {
        try {
            console.log('count:' + counter.next() );
        } catch (e) {
            console.log('done');
            clearInterval(id);
        }
    }, 500);
}