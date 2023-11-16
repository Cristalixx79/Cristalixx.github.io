(function(){
    //console.log('work');
    let originalPositions = [];
    let da_elements = document.querySelectorAll('[data-da]');
    let da_elements_array = [];
    let da_match_media = [];
    //fill the massives
    if(da_elements.length > 0){
        let number = 0
        for(let index = 0; index < da_elements.length; index++){
            const da_element = da_elements[index];
            const da_move = da_element.getAttribute('data-da');
            const da_array = da_move.split(',');
            if(da_array.length == 3){
                da_element.setAttribute('data-da-index', number);
                //fill the massive with the first positions
                originalPositions[number] = {
                    "parent": da_element.parentNode,
                    "index": index_in_parent(da_element),
                }
                //fill the massive of elements
                da_elements_array[number] = {
                    "element": da_element,
                    "destination": document.querySelector('.' + da_array[0].trim()),
                    "place": da_array[1].trim(),
                    "breakpoint": da_array[2].trim(),
                }
                number++;
            }
        }
        dynamic_adapt_sort(da_elements_array);

        //creating an event in breakpoit
        for(let index = 0; index < da_elements.length; index++){
            //console.log('work');
            const el = da_elements_array[index];
            const da_breakpoint = el.breakpoint;
            const da_type = "max";
            
            da_match_media.push(window.matchMedia("(" + da_type + "-width: " + da_breakpoint + "px)"));
            da_match_media[index].addEventListener("change", dynamic_adapt);
        }
    }

    //main function
    function dynamic_adapt(e){
        for(let index = 0; index < da_elements_array.length; index++){
            const el = da_elements_array[index];
            const da_element = el.element;
            const da_destination = el.destination;
            const da_place = el.place;
            const da_breakpoint = el.breakpoint;
            const da_classname = "_dynamic_adapt_" + da_breakpoint;

            if(da_match_media[index].matches) {
                //перебрасываем элементы
                if(!da_element.classList.contains(da_classname)){
                    let actual_index;
                    if(da_place == 'first'){
                        actual_index = index_of_elements(da_destination)[0];
                    }else if(da_place == 'last'){
                        actual_index = index_of_elements(da_destination)[index_of_elements(da_destination).length];
                    }else{
                        actual_index = index_of_elements(da_destination)[da_place];
                    }
                    da_destination.insertBefore(da_element, da_destination.children[actual_index]);
                    da_element.classList.add(da_classname);
                }
            }else{
                //return back
                if(da_element.classList.contains(da_classname)){
                    dynamic_adapt_back(da_element);
                    da_element.classList.remove(da_classname);
                }
            }
        }
    }

    //calling main function
    dynamic_adapt();

    function dynamic_adapt_back(el){
        //console.log('work');
        const da_index = el.getAttribute('data-da-index');
        const original_place = originalPositions[da_index];
        const parent_place = original_place['parent'];
        const index_place = original_place['index']
        const actual_index = index_of_elements(parent_place, true)[index_place];
        parent_place.insertBefore(el, parent_place.children[actual_index]);
    }

    //index in parent element
    function index_in_parent(el){
        //console.log('work');
        var children =  Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }

    //функция получения массива индексов элемениов внутри родителя
    function index_of_elements(parent, back){
        //console.log('work');
        const children = parent.children;
        const children_array = [];
        for(let index = 0; index < children.length; index++){
            const children_element = children[index];
            if(back){
                children_array.push(index);
            }else{
                //исключаем перенесённый эдемент
                if(children_element.getAttribute('data-da') == null){
                    children_array.push(index);
                }
            }
        }
        return children_array;
    }

    //сортировка объекта
    function dynamic_adapt_sort(arr){
        //console.log('work');
        arr.sort(function(a, b){
            if(a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
        });
        arr.sort(function(a, b){
            if(a.place > b.place) { return 1 } else { return -1 }
        });
    }
}());