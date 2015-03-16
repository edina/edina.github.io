var symbols = (function() {
  
    var _symbols = {};
    
    var windPath = "" ;
    var sunPath = "" ;
    var cloudyPath = "" ;
    var rainyPath = "" ;
    var overcastPath = "" ;
  
    //http://stackoverflow.com/questions/25332120/create-additional-d3-js-symbols

    var customSymbolTypes = d3.map({
      'thin-x': function(size) {
      size = Math.sqrt(size);
      return 'M' + (-size/2) + ',' + (-size/2) +
        'l' + size + ',' + size +
        'm0,' + -(size) + 
        'l' + (-size) + ',' + size;
      },
      'smiley': function(size) {
        size = Math.sqrt(size);
        var pad = size/5;
        var r = size/8;
        return 'M' + ((-size/2)+pad) + ',' + (-size/2) +
        ' m' + (-r) + ',0' +
        ' a' + r + ',' + r + ' 0 1,0' + (r * 2) + ',0' +
        ' a' + r + ',' + r + ' 0 1,0' + (-(r * 2)) + ',0' +

        'M' + ((size/2)-pad) + ',' + (-size/2) +
        ' m' + (-r) + ',0' +
        ' a' + r + ',' + r + ' 0 1,0' + (r * 2) + ',0' +
        ' a' + r + ',' + r + ' 0 1,0' + (-(r * 2)) + ',0' +

      'M' + (-size/2) + ',' + ((size/2)-(2*pad)) +
        'q' + (size/2) + ',' + (pad*2) + ' ' + size + ',0';
      },
      wind: function(size) {
    //    return 'M25,100 C25,100 25,50 25,50 C25,50 0,50 0,50 C0,50 35,0 35,0 C35,0 65,60 65,60 C65,60 40,60 40,60 C40,60 40,100 40,100 C40,100 25,100 25,100 Z' ;
          
        if(! windPath.length > 0 )  
        {
            windPath = symbols.scaleSymbol(1, 'M31,31 L1,16 L31,1 L21,16 L31,31 Z"') ;
        }
          
        return windPath ;  
          
      },
      sunny: function(size) {
        
        
          
            return 'M24,14 C24,14 28,0 28,0 C28,0 33,16 33,16 C33,16 44,4 44,4 C44,4 41,18 41,18 C41,18 51,33 51,33 C51,33 35,30 35,30 C35,30 36,48 36,48 C36,48 26,36 26,36 C26,36 13,45 13,45 C13,45 14,31 14,31 C14,31 0,28 0,28 C0,28 15,21 15,21 C15,21 9,1 9,1 C9,1 24,14 24,14 Z';

        
          },
     
      cloudy: function(size) {
          
          if(!cloudyPath.length > 0 )
          {
                cloudyPath = symbols.scaleSymbol(0.1,'M512,240.001c0-49.167-40-89.146-89.167-89.146c-2.396,0-4.771,0.104-7.146,0.291c-23.125-28.854-57.979-45.978-95.688-45.978c-37.688,0-72.562,17.124-95.688,45.979c-2.375-0.188-4.771-0.291-7.188-0.291C168,150.855,128,190.834,128,240.001c0,5.146,0.688,10.104,1.5,15.042c-0.542,0.708-1.188,1.354-1.708,2.083c-5.229-0.75-10.479-1.125-15.792-1.125C50.25,256.001,0,306.25,0,368c0,61.751,50.25,112,112,112c13.688,0,27.084-2.5,39.709-7.333C180.666,497.917,217.5,512,256,512c38.542,0,75.333-14.083,104.291-39.333C372.916,477.5,386.312,480,400,480c61.75,0,112-50.249,112-112c0-25.688-9.042-49.083-23.666-67.999C502.916,284.105,512,263.168,512,240.001z M400,448c-17.125,0-32.916-5.499-45.938-14.666C330.583,461.625,295.624,480,256,480c-39.625,0-74.584-18.375-98.062-46.666C144.938,442.501,129.126,448,112,448c-44.188,0-80-35.812-80-80s35.812-79.999,80-79.999c10.812,0,21.062,2.188,30.438,6.062c0.562-1.062,1.25-2,1.812-3.021c5.625-10.271,12.562-19.688,20.666-28.042C188,239.084,220.083,224,256,224c49.709,0,92.334,28.666,113.541,70.062c5.646-2.312,11.668-3.813,17.875-4.812L400,288c12.334,0,23.875,3.042,34.312,8c11.312,5.416,21.021,13.374,28.646,23.188c10.5,13.521,17.042,30.354,17.042,48.812C480,412.188,444.188,448,400,448zM465.562,277.625c-18.479-13.458-41-21.624-65.562-21.624c-5.312,0-10.562,0.375-15.792,1.125c-29.874-40.708-77.021-65.125-128.208-65.125c-34.125,0-66.312,11.042-92.938,30.334c7.479-22.854,28.729-39.479,54.062-39.479c7.75,0,15.062,1.562,21.75,4.332c15.188-29.562,45.625-50.02,81.125-50.02s65.958,20.457,81.084,50.02c6.729-2.77,14.083-4.332,21.749-4.332c31.584,0,57.167,25.583,57.167,57.146C480,254.48,474.438,267.542,465.562,277.625z' );
          }
          
          return cloudyPath ;
          
      },
    overcast: function(size) {       
          
        if(!overcastPath.length > 0 )
        {
            overcastPath =  symbols.scaleSymbol(0.1,'M208,64c8.833,0,16-7.167,16-16V16c0-8.833-7.167-16-16-16s-16,7.167-16,16v32C192,56.833,199.167,64,208,64z M332.438,106.167l22.625-22.625c6.249-6.25,6.249-16.375,0-22.625c-6.25-6.25-16.375-6.25-22.625,0l-22.625,22.625c-6.25,6.25-6.25,16.375,0,22.625C316.062,112.417,326.188,112.417,332.438,106.167z M16,224h32c8.833,0,16-7.167,16-16s-7.167-16-16-16H16c-8.833,0-16,7.167-16,16S7.167,224,16,224z M352,208c0,8.833,7.167,16,16,16h32c8.833,0,16-7.167,16-16s-7.167-16-16-16h-32C359.167,192,352,199.167,352,208z M83.541,106.167c6.251,6.25,16.376,6.25,22.625,0c6.251-6.25,6.251-16.375,0-22.625L83.541,60.917c-6.25-6.25-16.374-6.25-22.625,0c-6.25,6.25-6.25,16.375,0,22.625L83.541,106.167z M400,256c-5.312,0-10.562,0.375-15.792,1.125c-16.771-22.875-39.124-40.333-64.458-51.5C318.459,145,268.938,96,208,96c-61.75,0-112,50.25-112,112c0,17.438,4.334,33.75,11.5,48.438C47.875,258.875,0,307.812,0,368c0,61.75,50.25,112,112,112c13.688,0,27.084-2.5,39.709-7.333C180.666,497.917,217.5,512,256,512c38.542,0,75.333-14.083,104.291-39.333C372.916,477.5,386.312,480,400,480c61.75,0,112-50.25,112-112S461.75,256,400,256z M208,128c39.812,0,72.562,29.167,78.708,67.25c-10.021-2-20.249-3.25-30.708-3.25c-45.938,0-88.5,19.812-118.375,53.25C131.688,234.083,128,221.542,128,208C128,163.812,163.812,128,208,128z M400,448c-17.125,0-32.916-5.5-45.938-14.667C330.584,461.625,295.624,480,256,480c-39.625,0-74.584-18.375-98.062-46.667C144.938,442.5,129.125,448,112,448c-44.188,0-80-35.812-80-80s35.812-80,80-80c7.75,0,15.062,1.458,22.125,3.541c2.812,0.792,5.667,1.417,8.312,2.521c4.375-8.562,9.875-16.396,15.979-23.75C181.792,242.188,216.562,224,256,224c10.125,0,19.834,1.458,29.25,3.709c10.562,2.499,20.542,6.291,29.834,11.291c23.291,12.375,42.416,31.542,54.457,55.063C378.938,290.188,389.209,288,400,288c44.188,0,80,35.812,80,80S444.188,448,400,448z') ;
        }
        return overcastPath ;
          
      },
      rainy: function(size){ 
          
          if(!rainyPath.length > 0 )
          {
            rainyPath = symbols.scaleSymbol(0.1,'M400,64c-5.312,0-10.562,0.375-15.792,1.125C354.334,24.417,307.188,0,256,0s-98.312,24.417-128.208,65.125C122.562,64.375,117.312,64,112,64C50.25,64,0,114.25,0,176s50.25,112,112,112c13.688,0,27.084-2.5,39.709-7.333C180.666,305.917,217.5,320,256,320c38.542,0,75.333-14.083,104.291-39.333C372.916,285.5,386.312,288,400,288c61.75,0,112-50.25,112-112S461.75,64,400,64z M400,256c-17.125,0-32.916-5.5-45.938-14.667C330.584,269.625,295.624,288,256,288c-39.625,0-74.584-18.375-98.062-46.667C144.938,250.5,129.125,256,112,256c-44.188,0-80-35.812-80-80s35.812-80,80-80c10.812,0,21.062,2.208,30.438,6.083C163.667,60.667,206.291,32,256,32s92.334,28.667,113.541,70.083C378.938,98.208,389.209,96,400,96c44.188,0,80,35.812,80,80S444.188,256,400,256z M225,480c0,17.688,14.312,32,32,32s32-14.312,32-32s-32-64-32-64S225,462.312,225,480z M352,448c0,17.688,14.312,32,32,32s32-14.312,32-32s-32-64-32-64S352,430.312,352,448z M96,384c0,17.688,14.312,32,32,32s32-14.312,32-32s-32-64-32-64S96,366.312,96,384z' ); 
          }
          return rainyPath ;
      },
      
     sun: function(size) {
          
         if(!sunPath.length > 0)
          {
                    
            sunPath =  _symbols.scaleSymbol(0.1, 'm256,144c-61.75,0 -112,50.25 -112,112c0,61.75 50.25,112 112,112s112,-50.25 112,-112c0,-61.75 -50.25,-112 -112,-112zm0,192c-44.188,0 -80,-35.81201 -80,-80s35.812,-80 80,-80s80,35.812 80,80s-35.81201,80 -80,80zm0,-224c8.83301,0 16,-7.167 16,-16l0,-32c0,-8.833 -7.16699,-16 -16,-16s-16,7.167 -16,16l0,32c0,8.833 7.16701,16 16,16zm0,288c-8.83299,0 -16,7.16699 -16,16l0,32c0,8.83301 7.16701,16 16,16s16,-7.16699 16,-16l0,-32c0,-8.83301 -7.16699,-16 -16,-16zm124.43799,-245.83299l22.625,-22.625c6.25,-6.25 6.25,-16.375 0,-22.625c-6.25,-6.25 -16.375,-6.25 -22.625,0l-22.625,22.625c-6.25,6.25 -6.25,16.375 0,22.625c6.24902,6.25 16.375,6.25 22.625,0zm-248.87599,203.66701l-22.625,22.625c-6.25,6.24899 -6.25,16.37399 0,22.62399s16.375,6.25 22.625,0l22.625,-22.62399c6.25,-6.271 6.25,-16.37601 0,-22.625c-6.24899,-6.25101 -16.375,-6.272 -22.625,0zm-19.562,-101.83401c0,-8.83299 -7.167,-16 -16,-16l-32,0c-8.833,0 -16,7.16701 -16,16s7.167,16 16,16l32,0c8.833,0 16,-7.16699 16,-16zm336,-16l-32,0c-8.83301,0 -16,7.16701 -16,16s7.16699,16 16,16l32,0c8.83301,0 16,-7.16699 16,-16s-7.16699,-16 -16,-16zm-316.459,-85.83299c6.25101,6.25 16.37601,6.25 22.625,0c6.25101,-6.25 6.25101,-16.375 0,-22.625l-22.625,-22.625c-6.25,-6.25 -16.374,-6.25 -22.625,0c-6.25,6.25 -6.25,16.375 0,22.625l22.625,22.625zm248.91801,203.645c-6.271,-6.25 -16.37601,-6.25 -22.625,0c-6.25101,6.25 -6.271,16.375 0,22.625l22.625,22.625c6.24899,6.25 16.37399,6.25 22.62399,0s6.25,-16.37399 0,-22.625l-22.62399,-22.625z') ; 
          }
         return sunPath ;  
      }
    });

    
    _symbols.scaleSymbol = function(scalefactor, svgpath){
    
        // console.log("svgpath: " + svgpath) ;
        var newPath = "";
        var nextNumberString = "" ;
        
        
        for(var i = 0 ; i < svgpath.length ; i++)
        {
             
           var nextChar = svgpath.charAt(i) ;
            
        
           if(!(nextChar >= '0' && nextChar <= '9'))
           {
               //console.log("nextchar not digit:" + nextChar ) ;
                if(nextChar == "-")
                {
                  // beignning of negative number so mark start index of new number
                    if(nextNumberString.length > 0 )
                    {
                            // apply scale factor 
                        var scaledvalue = nextNumberString * scalefactor ;
                        
                        scaledValue = parseFloat(scaledvalue.toFixed(3)) ;
                       // console.log("nextNumberString (neg):" + nextNumberString + " scaled value: " + scaledvalue ) ;
                        newPath = newPath.concat(scaledvalue) ;
                    
                        
                    }
                    
                    nextNumberString = "-" ;
                    
                    // dont concat minus sign on to new path 
                }
                else if(nextChar == ".")
                {
               // nextChar is a decimal point
                  nextNumberString = nextNumberString.concat(nextChar) ;               
                }
                else 
                {
                  // current character is comma, space or command character
                    if(nextNumberString.length > 0 )
                    {
                        // apply scale factor 
                        var scaledvalue = nextNumberString * scalefactor ;
                        
                        scaledValue = parseFloat(scaledvalue.toFixed(3)) ;
                    //    console.log("nextNumberString:" + nextNumberString + " scaled value: " + scaledvalue ) ;
                        newPath = newPath.concat(scaledvalue) ;
                        nextNumberString = "" ;
                    }
                       newPath = newPath.concat(nextChar) ;                
            
                }
           }
            else
           {
               // nextChar is a digit
                  nextNumberString = nextNumberString.concat(nextChar) ;                    
           }
                
                
        } // ends for
        // console.log("new path: " + newPath ) ;
        return newPath ;
        
    };

    
    d3.svg.customSymbol = function() {
      var type,
          size = 64;
      function symbol(d,i) {
        return customSymbolTypes.get(type.call(this,d,i))(size.call(this,d,i));
      }
      symbol.type = function(_) {
        if (!arguments.length) return type;
        type = d3.functor(_);
        return symbol;
      };
      symbol.size = function(_) {
        if (!arguments.length) return size;
        size = d3.functor(_);
        return symbol;
      };
      return symbol;
    };

    _symbols.getSymbol = function(type, size) {
      size = size || 64;
      if (d3.svg.symbolTypes.indexOf(type) !== -1) {
        return d3.svg.symbol().type(type).size(size)();
      } else {
        return d3.svg.customSymbol().type(type).size(size)();
      }
    }
    
    return _symbols;
})();
