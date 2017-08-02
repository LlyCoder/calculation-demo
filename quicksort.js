const $ = (query)=>{
        return document.querySelector(query)
    };
    const $All = (query)=>{
        return document.querySelectorAll(query)
    };
    const arr = [1,3,5,9,13,10,2,12,8,4,6,7,11];
    for(let i=0;i<arr.length;i++){
        const rect = document.createElement("div");
        Object.assign(rect.style,{
            position:"absolute",
            backgroundColor:"black",
            left: (i+1)*25+"px",
            bottom: "10px",
            height: 50*arr[i]+"px",
            width: "20px",
            transition:"left .8s ease"
        });
        rect.className = "rect-"+arr[i];
        $("#root").appendChild(rect)
    }
    //sort

    const animationQueue = [];

    function QuickSort(arr,level=0){
        if(!arr.length) return arr;
        const pivot = arr[0];
        const left = [], right = [];
        arr.slice(1).forEach(x=>{
            if(x<pivot)
                left.push(x);
            else
                right.push(x)
        });
        animate([...left,pivot,...right],level);
        return [...QuickSort(left,level+1),pivot,...QuickSort(right,level+1)];
    }
    function animate(arr,level){
        animationQueue[level] = animationQueue[level] || [];
        const prerequisition = level ===0 ?Promise.resolve():Promise.all(animationQueue[level-1]);
        animationQueue[level].push(prerequisition.then(()=>{
            const offset = Math.min.apply(null,arr.map(x=>parseInt($('.rect-'+x).style.left)));
            arr.forEach((x,i)=>{
                $('.rect-'+x).style.left= offset+(i)*25+"px"
            });
            if(arr.length>0)
                return new Promise(resolve=>setTimeout(resolve,800));
            else return null;
        }));
    }
    QuickSort(arr);