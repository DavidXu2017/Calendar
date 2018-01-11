(function(){
  let datepicker = window.datepicker;
  var monthData;
  var $wrapper;
  datepicker.buildUi = function(year, month) {
    monthData = datepicker.getMonthData(year, month);
    let html = '<div class="ui-datepicker-header">' + 
      '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' + 
      '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' + 
      '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' + 
    '</div>' + 
    '<div class="ui-datepicker-body">' +
    '<table>'+ 
      '<thead>'+
        '<tr>'+
          '<th>Mon</th>'+
          '<th>Tue</th>'+
          '<th>Wed</th>'+
          '<th>Thu</th>'+
          '<th>Fri</th>'+
          '<th>Sat</th>'+
          '<th>Sun</th>'+
        '</tr>'+
      '</thead>'+
      '<tbody>';
        for (let i = 0; i < monthData.days.length; i++) {
          let date = monthData.days[i];
          if (i % 7 === 0) {
            html += '<tr>';
          }
          html += '<td data-date="'+ date.date + '">' + date.showDate + '</td>';
          if (i % 7 === 6) {
            html += '</tr>';
          }
        }

      html +='</tbody>'+
    '</table>'+
  '</div>';
  return html;
  };

  datepicker.render = function(direction) {
    let year, month;
    if(monthData) {
      year = monthData.year;
      month = monthData.month;
    }
    if(direction === 'prev') {
      month--;
      if(month === 0) {
        month = 12;
        year--;
      }
    }
    if(direction === 'next') {
      month++;
    }
    let html = datepicker.buildUi(year, month);

    $wrapper = document.querySelector('.ui-datepicker-wrapper');
    if(!$wrapper) {
      $wrapper = document.createElement('div');
      document.body.appendChild($wrapper);
      $wrapper.className = 'ui-datepicker-wrapper';
    }
    $wrapper.innerHTML = html;
  }

  datepicker.init = function (input) {
    datepicker.render()

    let $input = document.querySelector(input);
    var isOpen = false;

    $input.addEventListener('click', function(){
      if(isOpen) {
        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen = false;
      } else {
        $wrapper.classList.add('ui-datepicker-wrapper-show');
        let left = $input.offsetLeft;
        let top = $input.offsetTop;
        let height = $input.offsetHeight;
        $wrapper.style.top = top + height + 2 + 'px';
        $wrapper.style.left = left + 'px';
        isOpen = true;
      }
    }, false);

    $wrapper.addEventListener('click', function(e){
      let $target = e.target;
      if(!$target.classList.contains('ui-datepicker-btn')){
        return
      };
      //last month
      if($target.classList.contains('ui-datepicker-prev-btn')){
        datepicker.render('prev');
      } else if($target.classList.contains('ui-datepicker-next-btn')){
        datepicker.render('next');
      }
    },false);

    $wrapper.addEventListener('click', function(e){
      let $target = e.target;
      if ($target.tagName.toLowerCase()!=='td') return;
      let date = new Date(monthData.year, monthData.month - 1,$target.dataset.date);
      $input.value = format(date);
      $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen = false;
    },false);
  }

    function format(date) {
      ret = '';

      let padding = function(num) {
        if (num <= 9) {
          return '0' + num;
        }
        return num;
      }

      ret += date.getFullYear() + '-';

      ret += padding(date.getMonth() + 1) + '-';

      ret += padding(date.getDate());

      return ret;
    }

})()