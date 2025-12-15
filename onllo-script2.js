
// my own template for citations (js)
    // -------------------------------
    // !!!!! code tutorial source:
    // this code is used to... 

    // !!!!! end of source code
    // -------------------------------



// gallery accordian
    // -----------------------------------------------
    // !!!!! code tutorial source: https://www.w3schools.com/howto/howto_js_accordion.asp#gsc.tab=0
    // this code is used to make the accordian work, having it open and close when pressed 
        var acc = document.getElementsByClassName("accordion");

        for (i = 0; i < acc.length; i++){
            acc[i].addEventListener("click", function(){
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                    panel.style.maxHeight = null;
                }else{
                    panel.style.maxHeight = panel.scrollHeight + "px";
                } 
            });
        }
    // !!!!! end of source code
    // -----------------------------------------------





// gallery
    // ------------------------------------------------------------------------------------------------------------------------------------------------------
    // !!!!! code tutorial source: https://github.com/lange-lange/calendar-user-upload/blob/main/index.html
    // this code is used to add the numbers and make the buttons work (i'll try to go into detail throughout the code)
        // this video helped me to understand more on how the code works: https://youtu.be/8K2ihr3NC40?si=2GGL4GA7co3Z8Kdy
            // the calendar was the original code, from the linked source^^^, and through research and learning from a lott of my many mistakes,
            // i was able to repurpose the calendar code for the gallery, and by using if statements and arrays, it was easier to reuse the code, with a lot less lines
            // (i tried to avoid copying and pasting the same lines of code for the same functions, b/c otherwise it would have been 100s+ extra lines)

        const galleryEl = [
            document.getElementById('gallery0'),
            document.getElementById('gallery1'),
            document.getElementById('gallery2')
        ];
        const galleryModalBackdrop = [
            document.getElementById('galleryModalBackdrop0'),
            document.getElementById('galleryModalBackdrop1'),
            document.getElementById('galleryModalBackdrop2')
        ];
        const galleryUploadModal = [
            document.getElementById('galleryUploadModal0'),
            document.getElementById('galleryUploadModal1'),
            document.getElementById('galleryUploadModal2')
        ];      
        const modalBoxEl = [
            document.getElementById('modalBox0'),
            document.getElementById('modalBox1'),
            document.getElementById('modalBox2')
        ];
        const galleryFileInput = [
            document.getElementById('galleryFileInput0'),
            document.getElementById('galleryFileInput1'),
            document.getElementById('galleryFileInput2')
        ];
        const gallerySaveBtn = [
            document.getElementById('gallerySaveBtn0'),
            document.getElementById('gallerySaveBtn1'),
            document.getElementById('gallerySaveBtn2')
        ];
        const galleryCancelBtn = [
            document.getElementById('galleryCancelBtn0'),
            document.getElementById('galleryCancelBtn1'),
            document.getElementById('galleryCancelBtn2')
        ];
        // remove image button
        const galleryRemoveBtn = [
            document.getElementById('galleryRemoveBtn0'),
            document.getElementById('galleryRemoveBtn1'),
            document.getElementById('galleryRemoveBtn2')
        ];
        const selectedBox = [null, null, null];
        // the "folder" for the images, it's a different "folder" than the one for the calendar
        const galleryStorage = [
            'galleryImages0',
            'galleryImages1',
            'galleryImages2'
        ];

        const shirtbox = document.getElementById('galleryFileInput0')

        // lets me repeat the code for multiple galleries
        for(let i = 0; i < galleryEl.length; i++) {
            function repeatGalleries(){
                // load saved images
                const galleryImages = localStorage.getItem(galleryStorage[i]);
                const gallerySavedImages = JSON.parse(galleryImages || '{}');

                // create box cells
                for(let box = 1; box <=10 ; box++) {
                    const boxEl = document.createElement('div');
                    boxEl.className = 'box';

                    // changed the box names/info from dates to outfit numbers
                    const boxNumber = 'Outfit #' + box;

                    // if image saved for box, show thumbnail
                    if(gallerySavedImages[boxNumber]) {
                        const galleryImgEl = document.createElement('img');
                        galleryImgEl.src = gallerySavedImages[boxNumber];
                        boxEl.appendChild(galleryImgEl);
                    }

                    boxEl.addEventListener('click', () => openModal1(boxNumber));
                    galleryEl[i].appendChild(boxEl);
                }
            }

            // makes the 10-box grid
            function renderGallery(){
                    // brings in the specific gallery needed
                    galleryEl[i].innerHTML = '';
                    repeatGalleries();
                }

            function openModal1(boxNumber) {
                selectedBox[i] = boxNumber;
                modalBoxEl[i].textContent = boxNumber;
                galleryFileInput[i].value = '';
                galleryUploadModal[i].style.display = 'block';
                galleryModalBackdrop[i].style.display = 'block';
            }

            function closeModal1() {
                galleryUploadModal[i].style.display = 'none';
                galleryModalBackdrop[i].style.display = 'none';
            }

            // if no file was chosen, a pop-up message will appear
            gallerySaveBtn[i].addEventListener('click', () => {
                if(galleryFileInput[i].files.length === 0) {
                    alert('Please select an image file to upload.');
                    return;
                }

                // defining the const variables
                const galleryFile = galleryFileInput[i].files[0];

                const fr = new FileReader();

                // saving the image, and leaving it in the calendar to view at all times eve after refreshing the page b/c it's saved on local storage
                fr.onload = () => {
                    let galleryImages = JSON.parse(localStorage.getItem(galleryStorage[i]) || '{}');
                    // the images of the chosen date is read/found (b/c "reader" = new FileReader()) and shown (b/c ".result" returns/shows the found file)
                    galleryImages[selectedBox[i]] = fr.result;
                    localStorage.setItem(galleryStorage[i], JSON.stringify(galleryImages));
                    closeModal1();
                    renderGallery();
                };
                fr.readAsDataURL(galleryFile);
            });
                // remove image button
                galleryRemoveBtn[i].addEventListener('click', () => {

                // !!!!! "confirm()" code source: https://www.w3schools.com/jsref/met_win_confirm.asp
                // ideally, i fix the issue where i can delete a single image instead of th entire local storage, but for now i'll just give this warning
                    confirm('All images in this gallery be deleted, are you sure?');

                    let galleryImages = JSON.parse(localStorage.getItem(galleryStorage[i]) || '{}');

                // !!!!! ".removeItem" code source: https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
                    localStorage.removeItem(galleryStorage[i], JSON.stringify(galleryImages));
                    closeModal1();
                    renderGallery();
                });

                galleryCancelBtn[i].addEventListener('click', closeModal1);
                galleryModalBackdrop[i].addEventListener('click', closeModal1);

                renderGallery();
        }





// calendar
        const calendarEl = document.getElementById('calendar');
        const modalBackdrop = document.getElementById('modalBackdrop');
        const uploadModal = document.getElementById('uploadModal');
        const modalDateEl = document.getElementById('modalDate');
        const fileInput = document.getElementById('fileInput');
        const saveBtn = document.getElementById('saveBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        // remove image button
        const removeBtn = document.getElementById('removeBtn');

        let selectedDate = null;
        const storageKey = 'calendarImages';

        // format date yyyy-mm-dd
        function formatDate(date) {
            return date.toISOString().split('T')[0];
        }

        // render calendar of current month
        function renderCalendar() {
            calendarEl.innerHTML = '';
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();

            // start first day of month
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();

            // day of week for first day (0 Sunday - 6 Saturday)
            const startDay = firstDay.getDay();

            // load saved images
            const savedImages = JSON.parse(localStorage.getItem(storageKey) || '{}');

            // fill empty slots at beginning
            for(let i = 0; i < startDay; i++) {
                const emptyEl = document.createElement('div');
                calendarEl.appendChild(emptyEl);
            }

            // create day cells
            for(let day = 1; day <= daysInMonth; day++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'day';

                const dateObj = new Date(year, month, day);
                const dateStr = formatDate(dateObj);
                const dayNumberEl = document.createElement('div');

                dayNumberEl.textContent = day;
                dayNumberEl.className = 'day-number';
                dayEl.appendChild(dayNumberEl);

                // if image saved for day, show thumbnail
                if(savedImages[dateStr]) {
                    const imgEl = document.createElement('img');
                    imgEl.src = savedImages[dateStr];
                    imgEl.alt = `Outfit image for ${dateStr}`;
                    dayEl.appendChild(imgEl);
                }

                dayEl.addEventListener('click', () => openModal(dateStr));
                calendarEl.appendChild(dayEl);
            }
        }

        function openModal(dateStr) {
            selectedDate = dateStr;
            modalDateEl.textContent = dateStr;
            fileInput.value = '';
            uploadModal.style.display = 'block';
            modalBackdrop.style.display = 'block';
        }

        function closeModal() {
            uploadModal.style.display = 'none';
            modalBackdrop.style.display = 'none';
        }
        // if no file was chosen, a pop-up message will appear
        saveBtn.addEventListener('click', () => {
            if(fileInput.files.length === 0) {
                alert('Please select an image file to upload.');
                return;
            }

            // defining the const variables
            const file = fileInput.files[0];
            // converts file into data url
            const reader = new FileReader();

            // saving the image, and leaving it in the calendar to view at all times eve after refreshing the page b/c it's saved on local storage
            reader.onload = () => {
                let savedImages = JSON.parse(localStorage.getItem(storageKey) || '{}');
                // the images of the chosen date is read/found (b/c "reader" = new FileReader()) and shown (b/c ".result" returns/shows the found file)
                savedImages[selectedDate] = reader.result;
                localStorage.setItem(storageKey, JSON.stringify(savedImages));
                closeModal();
                renderCalendar();
            };
            reader.readAsDataURL(file);
        });

        // remove image button
        removeBtn.addEventListener('click', () => {
        // !!!!! "confirm()" code source: https://www.w3schools.com/jsref/met_win_confirm.asp
        // ideally, i fix the issue where i can delete a single image instead of th entire local storage, but for now i'll just give this warning
            confirm('All images will be deleted in this calendar, are you sure?');
            let savedImages = JSON.parse(localStorage.getItem(storageKey) || '{}');
        // !!!!! ".removeItem" code source: https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem
            localStorage.removeItem(storageKey, JSON.stringify(savedImages));
            closeModal();
            renderCalendar();
        });

        cancelBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);

        renderCalendar();
    // !!!!! end of source code
    // ------------------------------------------------------------------------------------------------------------------------------------------------------


