(function() {
    var $jscomp = $jscomp || {};
    $jscomp.scope = {};
    $jscomp.ASSUME_ES5 = !1;
    $jscomp.ASSUME_NO_NATIVE_MAP = !1;
    $jscomp.ASSUME_NO_NATIVE_SET = !1;
    $jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function($prototype$$) {
        var $ctor$$ = function $$ctor$$$() {};
        $ctor$$.prototype = $prototype$$;
        return new $ctor$$
    }
    ;
    $jscomp.underscoreProtoCanBeSet = function $$jscomp$underscoreProtoCanBeSet$() {
        var $x$$ = {
            a: !0
        }
          , $y$$ = {};
        try {
            return $y$$.__proto__ = $x$$,
            $y$$.a
        } catch ($e$$) {}
        return !1
    }
    ;
    $jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function($target$$, $proto$$) {
        $target$$.__proto__ = $proto$$;
        if ($target$$.__proto__ !== $proto$$)
            throw new TypeError($target$$ + " is not extensible");
        return $target$$
    }
    : null;
    $jscomp.inherits = function $$jscomp$inherits$($childCtor$$, $parentCtor$$) {
        $childCtor$$.prototype = $jscomp.objectCreate($parentCtor$$.prototype);
        $childCtor$$.prototype.constructor = $childCtor$$;
        if ($jscomp.setPrototypeOf) {
            var $p_setPrototypeOf$$ = $jscomp.setPrototypeOf;
            $p_setPrototypeOf$$($childCtor$$, $parentCtor$$)
        } else
            for ($p_setPrototypeOf$$ in $parentCtor$$)
                if ("prototype" != $p_setPrototypeOf$$)
                    if (Object.defineProperties) {
                        var $descriptor$$ = Object.getOwnPropertyDescriptor($parentCtor$$, $p_setPrototypeOf$$);
                        $descriptor$$ && Object.defineProperty($childCtor$$, $p_setPrototypeOf$$, $descriptor$$)
                    } else
                        $childCtor$$[$p_setPrototypeOf$$] = $parentCtor$$[$p_setPrototypeOf$$];
        $childCtor$$.superClass_ = $parentCtor$$.prototype
    }
    ;
    $jscomp.findInternal = function $$jscomp$findInternal$($array$$, $callback$$, $thisArg$$) {
        $array$$ instanceof String && ($array$$ = String($array$$));
        for (var $len$$ = $array$$.length, $i$$ = 0; $i$$ < $len$$; $i$$++) {
            var $value$$ = $array$$[$i$$];
            if ($callback$$.call($thisArg$$, $value$$, $i$$, $array$$))
                return {
                    i: $i$$,
                    v: $value$$
                }
        }
        return {
            i: -1,
            v: void 0
        }
    }
    ;
    $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function($target$$, $property$$, $descriptor$$) {
        $target$$ != Array.prototype && $target$$ != Object.prototype && ($target$$[$property$$] = $descriptor$$.value)
    }
    ;
    $jscomp.getGlobal = function $$jscomp$getGlobal$($maybeGlobal$$) {
        return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global && null != global ? global : $maybeGlobal$$
    }
    ;
    $jscomp.global = $jscomp.getGlobal(this);
    $jscomp.polyfill = function $$jscomp$polyfill$($property$jscomp$5_split_target$$, $impl_polyfill$$, $fromLang_obj$$, $i$$) {
        if ($impl_polyfill$$) {
            $fromLang_obj$$ = $jscomp.global;
            $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$.split(".");
            for ($i$$ = 0; $i$$ < $property$jscomp$5_split_target$$.length - 1; $i$$++) {
                var $key$$ = $property$jscomp$5_split_target$$[$i$$];
                $key$$ in $fromLang_obj$$ || ($fromLang_obj$$[$key$$] = {});
                $fromLang_obj$$ = $fromLang_obj$$[$key$$]
            }
            $property$jscomp$5_split_target$$ = $property$jscomp$5_split_target$$[$property$jscomp$5_split_target$$.length - 1];
            $i$$ = $fromLang_obj$$[$property$jscomp$5_split_target$$];
            $impl_polyfill$$ = $impl_polyfill$$($i$$);
            $impl_polyfill$$ != $i$$ && null != $impl_polyfill$$ && $jscomp.defineProperty($fromLang_obj$$, $property$jscomp$5_split_target$$, {
                configurable: !0,
                writable: !0,
                value: $impl_polyfill$$
            })
        }
    }
    ;
    var Heap$$module$node_modules$heap_tree$heaptree = function $Heap$$module$node_modules$heap_tree$heaptree$() {
        this.items = []
    };
    Heap$$module$node_modules$heap_tree$heaptree.prototype.seek = function $Heap$$module$node_modules$heap_tree$heaptree$$seek$() {
        return this.items[0]
    }
    ;
    var MaxHeap$$module$node_modules$heap_tree$heaptree = function $MaxHeap$$module$node_modules$heap_tree$heaptree$($selector$$) {
        Heap$$module$node_modules$heap_tree$heaptree.call(this);
        this.selector = $selector$$
    };
    $jscomp.inherits(MaxHeap$$module$node_modules$heap_tree$heaptree, Heap$$module$node_modules$heap_tree$heaptree);
    MaxHeap$$module$node_modules$heap_tree$heaptree.prototype.push = function $MaxHeap$$module$node_modules$heap_tree$heaptree$$push$($item_t$$) {
        var $i$$ = this.items.length;
        for (this.items.push($item_t$$); 0 < $i$$ && this.selector(this.items[Math.floor(($i$$ + 1) / 2 - 1)]) < this.selector(this.items[$i$$]); )
            $item_t$$ = this.items[$i$$],
            this.items[$i$$] = this.items[Math.floor(($i$$ + 1) / 2 - 1)],
            this.items[Math.floor(($i$$ + 1) / 2 - 1)] = $item_t$$,
            $i$$ = Math.floor(($i$$ + 1) / 2 - 1)
    }
    ;
    MaxHeap$$module$node_modules$heap_tree$heaptree.prototype.pop = function $MaxHeap$$module$node_modules$heap_tree$heaptree$$pop$() {
        if (1 >= this.items.length)
            return this.items.pop();
        var $ret$$ = this.items[0];
        this.items[0] = this.items.pop();
        for (var $i$$ = 0; ; ) {
            var $lowest$$ = this.selector(this.items[2 * ($i$$ + 1)]) > this.selector(this.items[2 * ($i$$ + 1) - 1]) ? 2 * ($i$$ + 1) : 2 * ($i$$ + 1) - 1;
            if (this.selector(this.items[$i$$]) < this.selector(this.items[$lowest$$])) {
                var $t$$ = this.items[$i$$];
                this.items[$i$$] = this.items[$lowest$$];
                this.items[$lowest$$] = $t$$;
                $i$$ = $lowest$$
            } else
                break
        }
        return $ret$$
    }
    ;
    MaxHeap$$module$node_modules$heap_tree$heaptree.prototype["delete"] = function $MaxHeap$$module$node_modules$heap_tree$heaptree$$delete$($i$jscomp$7_item$$) {
        $i$jscomp$7_item$$ = this.items.indexOf($i$jscomp$7_item$$);
        for (this.items[$i$jscomp$7_item$$] = this.items.pop(); ; ) {
            var $lowest$$ = this.selector(this.items[2 * ($i$jscomp$7_item$$ + 1)]) > this.selector(this.items[2 * ($i$jscomp$7_item$$ + 1) - 1]) ? 2 * ($i$jscomp$7_item$$ + 1) : 2 * ($i$jscomp$7_item$$ + 1) - 1;
            if (this.selector(this.items[$i$jscomp$7_item$$]) < this.selector(this.items[$lowest$$])) {
                var $t$$ = this.items[$i$jscomp$7_item$$];
                this.items[$i$jscomp$7_item$$] = this.items[$lowest$$];
                this.items[$lowest$$] = $t$$;
                $i$jscomp$7_item$$ = $lowest$$
            } else
                break
        }
    }
    ;
    MaxHeap$$module$node_modules$heap_tree$heaptree.prototype.heapify = function $MaxHeap$$module$node_modules$heap_tree$heaptree$$heapify$($arr$$) {
        for (var $i$$ = 0; $i$$ < $arr$$.length; $i$$++)
            this.push($arr$$[$i$$])
    }
    ;
    var MinHeap$$module$node_modules$heap_tree$heaptree = function $MinHeap$$module$node_modules$heap_tree$heaptree$($selector$$) {
        Heap$$module$node_modules$heap_tree$heaptree.call(this);
        this.selector = $selector$$
    };
    $jscomp.inherits(MinHeap$$module$node_modules$heap_tree$heaptree, Heap$$module$node_modules$heap_tree$heaptree);
    MinHeap$$module$node_modules$heap_tree$heaptree.prototype.push = function $MinHeap$$module$node_modules$heap_tree$heaptree$$push$($item$jscomp$2_t$$) {
        var $i$$ = this.items.length;
        for (this.items.push($item$jscomp$2_t$$); 0 < $i$$ && this.selector(this.items[Math.floor(($i$$ + 1) / 2 - 1)]) > this.selector(this.items[$i$$]); )
            $item$jscomp$2_t$$ = this.items[$i$$],
            this.items[$i$$] = this.items[Math.floor(($i$$ + 1) / 2 - 1)],
            this.items[Math.floor(($i$$ + 1) / 2 - 1)] = $item$jscomp$2_t$$,
            $i$$ = Math.floor(($i$$ + 1) / 2 - 1)
    }
    ;
    MinHeap$$module$node_modules$heap_tree$heaptree.prototype.pop = function $MinHeap$$module$node_modules$heap_tree$heaptree$$pop$() {
        if (1 >= this.items.length)
            return this.items.pop();
        var $ret$$ = this.items[0];
        this.items[0] = this.items.pop();
        for (var $i$$ = 0; ; ) {
            var $lowest$$ = this.selector(this.items[2 * ($i$$ + 1)]) < this.selector(this.items[2 * ($i$$ + 1) - 1]) ? 2 * ($i$$ + 1) : 2 * ($i$$ + 1) - 1;
            if (this.selector(this.items[$i$$]) > this.selector(this.items[$lowest$$])) {
                var $t$$ = this.items[$i$$];
                this.items[$i$$] = this.items[$lowest$$];
                this.items[$lowest$$] = $t$$;
                $i$$ = $lowest$$
            } else
                break
        }
        return $ret$$
    }
    ;
    MinHeap$$module$node_modules$heap_tree$heaptree.prototype["delete"] = function $MinHeap$$module$node_modules$heap_tree$heaptree$$delete$($i$jscomp$11_item$$) {
        $i$jscomp$11_item$$ = this.items.indexOf($i$jscomp$11_item$$);
        for (this.items[$i$jscomp$11_item$$] = this.items.pop(); ; ) {
            var $lowest$$ = this.selector(this.items[2 * ($i$jscomp$11_item$$ + 1)]) < this.selector(this.items[2 * ($i$jscomp$11_item$$ + 1) - 1]) ? 2 * ($i$jscomp$11_item$$ + 1) : 2 * ($i$jscomp$11_item$$ + 1) - 1;
            if (this.selector(this.items[$i$jscomp$11_item$$]) > this.selector(this.items[$lowest$$])) {
                var $t$$ = this.items[$i$jscomp$11_item$$];
                this.items[$i$jscomp$11_item$$] = this.items[$lowest$$];
                this.items[$lowest$$] = $t$$;
                $i$jscomp$11_item$$ = $lowest$$
            } else
                break
        }
    }
    ;
    MinHeap$$module$node_modules$heap_tree$heaptree.prototype.heapify = function $MinHeap$$module$node_modules$heap_tree$heaptree$$heapify$($arr$$) {
        for (var $i$$ = 0; $i$$ < $arr$$.length; $i$$++)
            this.push($arr$$[$i$$])
    }
    ;
    var module$node_modules$heap_tree$heaptree = {};
    module$node_modules$heap_tree$heaptree.MaxHeap = MaxHeap$$module$node_modules$heap_tree$heaptree;
    module$node_modules$heap_tree$heaptree.MinHeap = MinHeap$$module$node_modules$heap_tree$heaptree;
    var draggables = document.getElementsByClassName("draggable"), el = document.getElementById("c"), mousedown = !1, target;
    document.addEventListener("mousedown", function($e$$) {
        $e$$.target.hasAttribute("class") && -1 === $e$$.target.getAttribute("class").indexOf("draggable") || (mousedown = !0,
        target = $e$$.target)
    });
    document.addEventListener("mouseup", function($e$$) {
        $e$$.target.hasAttribute("class") && -1 === $e$$.target.getAttribute("class").indexOf("draggable") || (mousedown = !1)
    });
    document.addEventListener("mousemove", function($e$$) {
        if (!1 !== mousedown) {
            var $rect$$ = el.getBoundingClientRect()
              , $y$$ = Math.max($rect$$.top, Math.min($rect$$.bottom, $e$$.clientY)) + document.documentElement.scrollTop;
            target.style.left = Math.max($rect$$.left, Math.min($rect$$.right, $e$$.clientX)) + document.documentElement.scrollLeft - 20 + "px";
            target.style.top = $y$$ - 20 + "px"
        }
    });
    var imageInput$$module$src$image = document.getElementById("image")
      , canvas$$module$src$image = document.getElementById("c")
      , fromFile$$module$src$image = function $fromFile$$module$src$image$() {
        var $file$$ = imageInput$$module$src$image.files[0];
        if (!$file$$)
            return alert("Can only reset when a file has been chosen");
        var $fr$$ = new FileReader;
        $fr$$.onload = function $$fr$$$onload$() {
            var $img$$ = new Image;
            $img$$.onload = function $$img$$$onload$() {
                canvas$$module$src$image.width = $img$$.width;
                canvas$$module$src$image.height = $img$$.height;
                canvas$$module$src$image.getContext("2d").drawImage($img$$, 0, 0);
                var $event$$ = document.createEvent("Event");
                $event$$.initEvent("mazeimgloaded", !0, !0);
                document.dispatchEvent($event$$)
            }
            ;
            $img$$.src = $fr$$.result
        }
        ;
        $fr$$.readAsDataURL($file$$)
    };
    imageInput$$module$src$image.addEventListener("change", fromFile$$module$src$image);
    var module$src$image = {
        fromFile: fromFile$$module$src$image
    };
    var GridPath$$module$src$pathfinding = function $GridPath$$module$src$pathfinding$($width$$, $height$$) {
        this.width = $width$$;
        this.height = $height$$;
        this.len = $width$$ * $height$$;
        this.goalI = this.startI = null;
        this.workingNodes = []
    };
    GridPath$$module$src$pathfinding.prototype.find = function $GridPath$$module$src$pathfinding$$find$($startI$$, $goalI$$, $evaluator$$) {
        this.startI = $startI$$;
        this.goalI = $goalI$$;
        var $closedSet$$ = {}
          , $cameFrom$$ = {}
          , $gScore$$ = {};
        $gScore$$[$startI$$] = 0;
        var $fScore$$ = {}
          , $openSet$$ = new MinHeap$$module$node_modules$heap_tree$heaptree(function($index$$) {
            return $fScore$$[$index$$] || Infinity
        }
        );
        $fScore$$[$startI$$] = this.heuristicCostEstimateSquared($startI$$, $goalI$$);
        $openSet$$.push($startI$$);
        return function whileLoopFunc() {
            this.workingNodes = [];
            if (0 >= $openSet$$.items.length)
                return null;
            var $currentI$$ = $openSet$$.pop();
            if ($currentI$$ === $goalI$$)
                return this.reconstructPath($cameFrom$$, $currentI$$);
            $closedSet$$[$currentI$$] = !0;
            for (var $neighboursI$$ = this.neighboursI($currentI$$), $i$$ = 0; $i$$ < $neighboursI$$.length; $i$$++) {
                var $neighbourI$$ = $neighboursI$$[$i$$];
                if (!(0 > $neighbourI$$ || $neighbourI$$ > this.len || $closedSet$$[$neighbourI$$]) && $evaluator$$[$neighbourI$$]) {
                    var $tentativeGscore$$ = $gScore$$[$currentI$$] + 1;
                    $fScore$$[$neighbourI$$] ? $tentativeGscore$$ < $gScore$$[$neighbourI$$] && ($cameFrom$$[$neighbourI$$] = $currentI$$,
                    $gScore$$[$neighbourI$$] = $tentativeGscore$$,
                    $fScore$$[$neighbourI$$] = $tentativeGscore$$ + this.heuristicCostEstimateSquared($neighbourI$$, $goalI$$),
                    $openSet$$["delete"]($neighbourI$$),
                    $openSet$$.push($neighbourI$$),
                    this.workingNodes.push($neighbourI$$)) : ($cameFrom$$[$neighbourI$$] = $currentI$$,
                    $gScore$$[$neighbourI$$] = $tentativeGscore$$,
                    $fScore$$[$neighbourI$$] = $tentativeGscore$$ + this.heuristicCostEstimateSquared($neighbourI$$, $goalI$$),
                    this.workingNodes.push($neighbourI$$),
                    $openSet$$.push($neighbourI$$))
                }
            }
        }
        .bind(this)
    }
    ;
    GridPath$$module$src$pathfinding.prototype.reconstructPath = function $GridPath$$module$src$pathfinding$$reconstructPath$($cameFrom$$, $currentI$$) {
        var $counter_nodesI$$ = 0
          , $path$$ = [];
        for ($path$$.push($currentI$$); $currentI$$ !== this.startI; )
            if ($path$$.push($currentI$$),
            $currentI$$ = $cameFrom$$[$currentI$$],
            999999 < $counter_nodesI$$++)
                return null;
        $path$$.push(this.startI);
        $counter_nodesI$$ = Array($path$$.length);
        for (var $i$$ = 0; $i$$ < $path$$.length; $i$$++)
            $counter_nodesI$$[$i$$] = $path$$[$path$$.length - 1 - $i$$];
        return $counter_nodesI$$
    }
    ;
    GridPath$$module$src$pathfinding.prototype.neighboursI = function $GridPath$$module$src$pathfinding$$neighboursI$($nodeI$$) {
        return [$nodeI$$ - this.width, $nodeI$$ + 1, $nodeI$$ + this.width, $nodeI$$ - 1]
    }
    ;
    GridPath$$module$src$pathfinding.prototype.heuristicCostEstimateSquared = function $GridPath$$module$src$pathfinding$$heuristicCostEstimateSquared$($node1I$$, $node2I$$) {
        return Math.pow($node2I$$ % this.width - $node1I$$ % this.width, 2) + Math.pow(Math.floor($node2I$$ / this.width) - Math.floor($node1I$$ / this.width), 2)
    }
    ;
    var module$src$pathfinding = {};
    module$src$pathfinding.GridPath = GridPath$$module$src$pathfinding;
    var resolution$$module$src$maze_solver = 5, canvas$$module$src$maze_solver = document.getElementById("c"), ctx$$module$src$maze_solver = canvas$$module$src$maze_solver.getContext("2d"), startBtn$$module$src$maze_solver = document.getElementById("start"), mazeStart$$module$src$maze_solver = document.getElementById("maze-start"), mazeEnd$$module$src$maze_solver = document.getElementById("maze-end"), resetBtn$$module$src$maze_solver = document.getElementById("reset"), resolutionSlider$$module$src$maze_solver = document.getElementById("resolution"), resolutionOutput$$module$src$maze_solver = document.getElementById("resolution-output"), speedSlider$$module$src$maze_solver = document.getElementById("speed"), speedOutput$$module$src$maze_solver = document.getElementById("speed-output"), memoryModel$$module$src$maze_solver = null, columns$$module$src$maze_solver, rows$$module$src$maze_solver, wTimeMs$$module$src$maze_solver = 100, interval$$module$src$maze_solver, defaultImg$$module$src$maze_solver = new Image;
    defaultImg$$module$src$maze_solver.onload = function $defaultImg$$module$src$maze_solver$onload$() {
        canvas$$module$src$maze_solver.width = defaultImg$$module$src$maze_solver.width;
        canvas$$module$src$maze_solver.height = defaultImg$$module$src$maze_solver.height;
        ctx$$module$src$maze_solver.drawImage(defaultImg$$module$src$maze_solver, 0, 0);
        var $event$$ = document.createEvent("Event");
        $event$$.initEvent("mazeimgloaded", !0, !0);
        document.dispatchEvent($event$$)
    }
    ;
    defaultImg$$module$src$maze_solver.src = "maze.png";
    document.addEventListener("mazeimgloaded", function() {
        columns$$module$src$maze_solver = Math.ceil(canvas$$module$src$maze_solver.width / resolution$$module$src$maze_solver);
        rows$$module$src$maze_solver = Math.ceil(canvas$$module$src$maze_solver.height / resolution$$module$src$maze_solver);
        var $usestransp$$ = !1;
        memoryModel$$module$src$maze_solver = Array(rows$$module$src$maze_solver * columns$$module$src$maze_solver);
        for (var $y$$ = 0; $y$$ < rows$$module$src$maze_solver; $y$$++)
            for (var $x$$ = 0; $x$$ < columns$$module$src$maze_solver; $x$$++) {
                var $col_imgd$$ = ctx$$module$src$maze_solver.getImageData($x$$ * resolution$$module$src$maze_solver, $y$$ * resolution$$module$src$maze_solver, resolution$$module$src$maze_solver, resolution$$module$src$maze_solver);
                $col_imgd$$ = getColor$$module$src$maze_solver($col_imgd$$);
                120 > $col_imgd$$[3] && ($usestransp$$ = !0);
                memoryModel$$module$src$maze_solver[$y$$ * columns$$module$src$maze_solver + $x$$] = 382.5 < $col_imgd$$[0] + $col_imgd$$[1] + $col_imgd$$[2]
            }
        $usestransp$$ && console.warn("this image uses transparency. Transparent regions might be converted to black");
        console.log(memoryModel$$module$src$maze_solver)
    });
    startBtn$$module$src$maze_solver.addEventListener("click", start$$module$src$maze_solver);
    resetBtn$$module$src$maze_solver.addEventListener("click", function() {
        interval$$module$src$maze_solver && clearInterval(interval$$module$src$maze_solver);
        module$src$image.fromFile()
    });
    resolutionSlider$$module$src$maze_solver.addEventListener("change", function($e$$) {
        resolution$$module$src$maze_solver = $e$$.target.value;
        resolutionOutput$$module$src$maze_solver.innerText = $e$$.target.value + "px"
    });
    speedSlider$$module$src$maze_solver.addEventListener("change", function($e$$) {
        wTimeMs$$module$src$maze_solver = 300 / $e$$.target.value;
        speedOutput$$module$src$maze_solver.innerText = $e$$.target.value + "%"
    });
    triggerEvent$$module$src$maze_solver("change", resolutionSlider$$module$src$maze_solver);
    triggerEvent$$module$src$maze_solver("change", speedSlider$$module$src$maze_solver);
    function start$$module$src$maze_solver() {
        var $pathfinding$$ = new GridPath$$module$src$pathfinding(columns$$module$src$maze_solver,rows$$module$src$maze_solver)
          , $oldnodes$$ = []
          , $startPos$$ = getStartPos$$module$src$maze_solver();
        $startPos$$.x = Math.max(0, Math.min(columns$$module$src$maze_solver, $startPos$$.x));
        $startPos$$.y = Math.max(0, Math.min(rows$$module$src$maze_solver, $startPos$$.y));
        var $endPos$$ = getEndPos$$module$src$maze_solver();
        $endPos$$.x = Math.max(0, Math.min(columns$$module$src$maze_solver, $endPos$$.x));
        $endPos$$.y = Math.max(0, Math.min(rows$$module$src$maze_solver, $endPos$$.y));
        var $whileLoopFunc$$ = $pathfinding$$.find($startPos$$.x + columns$$module$src$maze_solver * $startPos$$.y, $endPos$$.x + columns$$module$src$maze_solver * $endPos$$.y, memoryModel$$module$src$maze_solver);
        interval$$module$src$maze_solver = setInterval(function whileLoopWrapper() {
            var $inspectedNodes_ret$$ = $whileLoopFunc$$();
            if (void 0 !== $inspectedNodes_ret$$) {
                clearInterval(interval$$module$src$maze_solver);
                console.log("done");
                for (var $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ = 0; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ < $oldnodes$$.length; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$++)
                    ctx$$module$src$maze_solver.fillStyle = "#f00",
                    ctx$$module$src$maze_solver.fillRect($oldnodes$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] % columns$$module$src$maze_solver * resolution$$module$src$maze_solver, Math.floor($oldnodes$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] / columns$$module$src$maze_solver) * resolution$$module$src$maze_solver, resolution$$module$src$maze_solver, resolution$$module$src$maze_solver);
                for ($i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ = 0; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ < $inspectedNodes_ret$$.length; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$++)
                    ctx$$module$src$maze_solver.fillStyle = "#00f",
                    ctx$$module$src$maze_solver.fillRect($inspectedNodes_ret$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] % columns$$module$src$maze_solver * resolution$$module$src$maze_solver, Math.floor($inspectedNodes_ret$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] / columns$$module$src$maze_solver) * resolution$$module$src$maze_solver, resolution$$module$src$maze_solver, resolution$$module$src$maze_solver)
            } else {
                $inspectedNodes_ret$$ = $pathfinding$$.workingNodes;
                console.log($inspectedNodes_ret$$);
                for ($i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ = 0; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ < $oldnodes$$.length; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$++)
                    ctx$$module$src$maze_solver.fillStyle = "#f00",
                    ctx$$module$src$maze_solver.fillRect($oldnodes$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] % columns$$module$src$maze_solver * resolution$$module$src$maze_solver, Math.floor($oldnodes$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] / columns$$module$src$maze_solver) * resolution$$module$src$maze_solver, resolution$$module$src$maze_solver, resolution$$module$src$maze_solver);
                for ($i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ = 0; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$ < $inspectedNodes_ret$$.length; $i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$++)
                    ctx$$module$src$maze_solver.fillStyle = "#ff0",
                    ctx$$module$src$maze_solver.fillRect($inspectedNodes_ret$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] % columns$$module$src$maze_solver * resolution$$module$src$maze_solver, Math.floor($inspectedNodes_ret$$[$i$0_i$1$jscomp$inline_5_i$jscomp$15_i$$] / columns$$module$src$maze_solver) * resolution$$module$src$maze_solver, resolution$$module$src$maze_solver, resolution$$module$src$maze_solver);
                $oldnodes$$ = $inspectedNodes_ret$$
            }
        }, wTimeMs$$module$src$maze_solver)
    }
    function getColor$$module$src$maze_solver($imgd$$) {
        $imgd$$ = $imgd$$.data;
        for (var $cols$$ = [0, 0, 0, 0], $i$$ = 0, $n$$ = $imgd$$.length; $i$$ < $n$$; $i$$ += 4)
            $cols$$[0] += $imgd$$[$i$$],
            $cols$$[1] += $imgd$$[$i$$ + 1],
            $cols$$[2] += $imgd$$[$i$$ + 2],
            $cols$$[3] += $imgd$$[$i$$ + 3];
        $cols$$[0] /= $imgd$$.length / 4;
        $cols$$[1] /= $imgd$$.length / 4;
        $cols$$[2] /= $imgd$$.length / 4;
        $cols$$[3] /= $imgd$$.length / 4;
        return $cols$$
    }
    function getMousePos$$module$src$maze_solver($canvas$$, $evt$$) {
        var $rect$$ = $canvas$$.getBoundingClientRect();
        return {
            x: Math.round(($evt$$.clientX - $rect$$.left - $canvas$$.width / resolution$$module$src$maze_solver * .5) / $canvas$$.width * resolution$$module$src$maze_solver),
            y: Math.round(($evt$$.clientY - $rect$$.top - $canvas$$.height / resolution$$module$src$maze_solver * .5) / $canvas$$.height * resolution$$module$src$maze_solver)
        }
    }
    function getStartPos$$module$src$maze_solver() {
        var $rect$$ = canvas$$module$src$maze_solver.getBoundingClientRect()
          , $startRect$$ = mazeStart$$module$src$maze_solver.getBoundingClientRect();
        return {
            x: Math.round(($startRect$$.x - $rect$$.left) / resolution$$module$src$maze_solver),
            y: Math.round(($startRect$$.y - $rect$$.top) / resolution$$module$src$maze_solver)
        }
    }
    function getEndPos$$module$src$maze_solver() {
        var $rect$$ = canvas$$module$src$maze_solver.getBoundingClientRect()
          , $endRect$$ = mazeEnd$$module$src$maze_solver.getBoundingClientRect();
        return {
            x: Math.round(($endRect$$.x - $rect$$.left) / resolution$$module$src$maze_solver),
            y: Math.round(($endRect$$.y - $rect$$.top) / resolution$$module$src$maze_solver)
        }
    }
    function triggerEvent$$module$src$maze_solver($name$$, $elem$$) {
        if ("createEvent"in document) {
            var $evt$$ = document.createEvent("HTMLEvents");
            $evt$$.initEvent($name$$, !1, !0);
            $elem$$.dispatchEvent($evt$$)
        } else
            $elem$$.fireEvent($name$$)
    }
    var module$src$maze_solver = {};
}
).call(this)

//# sourceMappingURL=maze-solver.min.js.map
