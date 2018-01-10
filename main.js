(function(){
  let datepicker = window.datepicker;
  datepicker.buildUi = function(year, month) {
    let monthData = datepicker.getMonthData(year, month);
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
          html += '<td>' + date.showDate + '</td>';
          if (i % 7 === 6) {
            html += '</tr>';
          }
        }

      html +='</tbody>'+
    '</table>'+
  '</div>';
  return html;
  };
  datepicker.init = function ($input) {
    let html = datepicker.buildUi();
    let $wrapper = document.createElement('div');
    $wrapper.className = 'ui-datepicker-wrapper';
    $wrapper.innerHTML = html;
    document.body.appendChild($wrapper)
  }
})()