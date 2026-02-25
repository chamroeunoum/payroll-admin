<template>
  <div class="relative" >
    <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="fade" >
        <div class="vcb-thumbnail mb-12" >
          <div class="flex flex-wrap justify-center w-full apps ">
            <router-link to="/user" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12.5 10c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm6.5 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2c-1.11 0-2.01.89-2 2c0 1.11.89 2 2 2zM11.99 2.01c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zM5.84 17.12c.68-.54 2.27-1.11 3.66-1.11c.07 0 .15.01.23.01c.24-.64.67-1.29 1.3-1.86A9.05 9.05 0 0 0 9.5 14c-1.3 0-3.39.45-4.73 1.43c-.5-1.04-.78-2.2-.78-3.43c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.2-.27 2.34-.75 3.37c-1-.59-2.36-.87-3.24-.87c-1.52 0-4.5.81-4.5 2.7v2.78a7.935 7.935 0 0 1-5.66-2.86z" fill="currentColor"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >គណនី</div>
              </div>
            </router-link>
            <router-link to="/officer" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M18 13a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h6a1 1 0 0 0 0-2h-6zm-6-4a2 2 0 1 1-4 0a2 2 0 0 1 4 0zm-6 4.5A1.5 1.5 0 0 1 8.5 16h5a1.5 1.5 0 0 1 1.5 1.5s0 3.5-4 3.5s-4-3.5-4-3.5zM2 7.25A3.25 3.25 0 0 1 5.25 4h21.5A3.25 3.25 0 0 1 30 7.25v17.5A3.25 3.25 0 0 1 26.75 28H5.25A3.25 3.25 0 0 1 2 24.75V7.25zM5.25 6C4.56 6 4 6.56 4 7.25v17.5c0 .69.56 1.25 1.25 1.25h21.5c.69 0 1.25-.56 1.25-1.25V7.25C28 6.56 27.44 6 26.75 6H5.25z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >បុគ្គលិក</div>
              </div>
            </router-link>
            <router-link to="/position" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M28.07 21L22 15l6.07-6l1.43 1.41L24.86 15l4.64 4.59L28.07 21z" fill="currentColor"></path><path d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" fill="currentColor"></path><path d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z" fill="currentColor"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >តួនាទី</div>
              </div>
            </router-link>
            <router-link to="/organization" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H10v1a5 5 0 0 1 5 5v1h1a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2h1v-1a5.002 5.002 0 0 1 4-4.9V2.5zm7 9.5h-1.5a.5.5 0 0 1-.5-.5V10a4 4 0 0 0-8 0v1.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0-1 1v4h5v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2h5v-4a1 1 0 0 0-1-1zM6 13.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zm9 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM8.5 9a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zm3.5.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0v-2zM9 17h2v-2H9v2z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >ផ្នែក</div>
              </div>
            </router-link>
            <!-- <router-link to="/tenant" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M208 368v104a23.73 23.73 0 0 0 24 24h0a23.73 23.73 0 0 0 24-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><path d="M256 368v104a23.73 23.73 0 0 0 24 24h0a23.73 23.73 0 0 0 24-24V368" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><path d="M183 274a23.73 23.73 0 0 1-29.84 16.18h0a23.72 23.72 0 0 1-16.17-29.84l25-84.28A44.85 44.85 0 0 1 205 144h102a44.85 44.85 0 0 1 43 32.08l25 84.28a23.72 23.72 0 0 1-16.17 29.84h0a23.73 23.73 0 0 1-29.78-16.2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><circle cx="256" cy="56" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M208 192l-48 160h192l-48-160"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >អ្នកជួល</div>
              </div>
            </router-link>
            <router-link to="/agent" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M208 208v264a23.73 23.73 0 0 0 24 24h0a23.73 23.73 0 0 0 24-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><path d="M256 336v136a23.73 23.73 0 0 0 24 24h0a23.73 23.73 0 0 0 24-24V208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><path d="M208 192v88a23.72 23.72 0 0 1-24 24h0a23.72 23.72 0 0 1-24-24v-88a48 48 0 0 1 48-48h96a48 48 0 0 1 48 48v88a23.72 23.72 0 0 1-24 24h0a23.72 23.72 0 0 1-24-24v-88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></path><circle cx="256" cy="56" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >ភ្នាក់ងារ</div>
              </div>
            </router-link>
            <router-link to="/service" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M26 20h-6v-2h6z" fill="currentColor"></path><path d="M30 28h-6v-2h6z" fill="currentColor"></path><path d="M28 24h-6v-2h6z" fill="currentColor"></path><path d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2zm-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848zM15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28z" fill="currentColor"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >សេវា</div>
              </div>
            </router-link>
            <router-link to="/facility" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9l-6 6"></path><path d="M10 12l2 2"></path><path d="M12 10l2 2"></path><path d="M8 21a5 5 0 0 0-5-5"></path><path d="M16 3C8.82 3 3 8.82 3 16a5 5 0 0 0 5 5c7.18 0 13-5.82 13-13a5 5 0 0 0-5-5"></path><path d="M16 3a5 5 0 0 0 5 5"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >សម្ភារៈ</div>
              </div>
            </router-link>
            <router-link to="/food" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M9.5 3a.5.5 0 0 1 .492.41L10 3.5v3a2.5 2.5 0 0 1-2 2.45v7.55a.5.5 0 0 1-.992.09L7 16.5V8.95a2.501 2.501 0 0 1-1.994-2.279L5 6.5v-3a.5.5 0 0 1 .992-.09L6 3.5v3a1.5 1.5 0 0 0 1 1.415V3.5a.5.5 0 0 1 .992-.09L8 3.5v4.414c.538-.19.935-.678.993-1.265L9 6.5v-3a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .492.41L15 3.5v13a.5.5 0 0 1-.992.09L14 16.5V11h-1.5a.5.5 0 0 1-.492-.41L12 10.5v-5A2.5 2.5 0 0 1 14.5 3zm-.5 7V4.085c-.538.19-.935.678-.993 1.266L13 5.5V10h1V4.085V10z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >អាហារ និងភេសជ្ជៈ</div>
              </div>
            </router-link> -->
            <router-link to="/holiday" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><rect fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" x="48" y="80" width="416" height="384" rx="48"></rect><circle cx="296" cy="232" r="24" fill="currentColor"></circle><circle cx="376" cy="232" r="24" fill="currentColor"></circle><circle cx="296" cy="312" r="24" fill="currentColor"></circle><circle cx="376" cy="312" r="24" fill="currentColor"></circle><circle cx="136" cy="312" r="24" fill="currentColor"></circle><circle cx="216" cy="312" r="24" fill="currentColor"></circle><circle cx="136" cy="392" r="24" fill="currentColor"></circle><circle cx="216" cy="392" r="24" fill="currentColor"></circle><circle cx="296" cy="392" r="24" fill="currentColor"></circle><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" d="M128 48v32"></path><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" stroke-linecap="round" d="M384 48v32"></path><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M464 160H48"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >ថ្ងៃឈប់សម្រាក់ប្រចាំឆ្នាំ</div>
              </div>
            </router-link>
            <router-link to="/salaryadjustment" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.5 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM9 10a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zM2 6.25A2.25 2.25 0 0 1 4.25 4h12.5A2.25 2.25 0 0 1 19 6.25V11h-1.5V8.5h-.75a2.25 2.25 0 0 1-2.25-2.25V5.5h-8v.75A2.25 2.25 0 0 1 4.25 8.5H3.5v3h.75a2.25 2.25 0 0 1 2.25 2.25v.75H14V16H4.25A2.25 2.25 0 0 1 2 13.75v-7.5zm2.25-.75a.75.75 0 0 0-.75.75V7h.75A.75.75 0 0 0 5 6.25V5.5h-.75zM17.5 7v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75h.75zm-14 6.75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5v.75zm.901 3.75H14V19H7c-1.11 0-2.08-.603-2.599-1.5zM22 11V9c0-1.11-.603-2.08-1.5-2.599V11H22zm-5.5 1a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-5zm.5 4.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zM16.5 14a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >គោលការណ៍សម្របសម្រួលប្រាក់ខែ</div>
              </div>
            </router-link>
            <router-link to="/Attendancepolicy" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >គោលការណ៍វត្តមាន</div>
              </div>
            </router-link>
            <router-link to="/salaryadjustment" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M10.5 7a3 3 0 1 0 0 6a3 3 0 0 0 0-6zM9 10a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0zM2 6.25A2.25 2.25 0 0 1 4.25 4h12.5A2.25 2.25 0 0 1 19 6.25V11h-1.5V8.5h-.75a2.25 2.25 0 0 1-2.25-2.25V5.5h-8v.75A2.25 2.25 0 0 1 4.25 8.5H3.5v3h.75a2.25 2.25 0 0 1 2.25 2.25v.75H14V16H4.25A2.25 2.25 0 0 1 2 13.75v-7.5zm2.25-.75a.75.75 0 0 0-.75.75V7h.75A.75.75 0 0 0 5 6.25V5.5h-.75zM17.5 7v-.75a.75.75 0 0 0-.75-.75H16v.75c0 .414.336.75.75.75h.75zm-14 6.75c0 .414.336.75.75.75H5v-.75a.75.75 0 0 0-.75-.75H3.5v.75zm.901 3.75H14V19H7c-1.11 0-2.08-.603-2.599-1.5zM22 11V9c0-1.11-.603-2.08-1.5-2.599V11H22zm-5.5 1a1.5 1.5 0 0 0-1.5 1.5v8a1.5 1.5 0 0 0 1.5 1.5h5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-5zm.5 4.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm-3 2h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zm3 0h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1 0-1zM16.5 14a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >គោលការណ៍ប្រាក់ខែ</div>
              </div>
            </router-link>
            <router-link to="/generalsetting" class="bg-gray-50 shadow py-4 px-8 hover:scale-110 transform-gpu duration-300 text-center p-2 m-4  cursor-pointer hover:bg-gray-50 hover:bg-opacity-10 rounded-lg" >
              <div class='w-full dashboard-widget-link' >
                <div class="w-16 mx-auto my-2 " >
                  <svg class="text-blue-500 " 
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M14 4.5A2.5 2.5 0 0 0 11.5 2h-7A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h1.757a5.507 5.507 0 0 1-.657-1H4.5A1.5 1.5 0 0 1 3 11.5V6h4.337c.895-.63 1.986-1 3.163-1c1.33 0 2.55.472 3.5 1.257V4.5zm-3.5.5H3v-.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5V5h-2.5zM6.635 9.92a2 2 0 0 0 1.43-2.478l-.155-.557c.254-.195.529-.362.821-.497l.338.358a2 2 0 0 0 2.91.001l.324-.343c.298.14.578.314.835.518l-.126.422a2 2 0 0 0 1.456 2.519l.349.082a4.698 4.698 0 0 1 .01 1.017l-.46.118a2 2 0 0 0-1.431 2.478l.156.556c-.254.196-.53.363-.822.498l-.338-.358a2 2 0 0 0-2.909-.002l-.325.345a4.322 4.322 0 0 1-.835-.518l.127-.423a2 2 0 0 0-1.456-2.519l-.35-.083a4.702 4.702 0 0 1-.01-1.016l.461-.118zm4.865.58a1 1 0 1 0-2 0a1 1 0 0 0 2 0z" fill="currentColor"></path></g></svg>
                </div>
                <div class="font-pvh p-2 m-auto text-xs text-center text-grat-800" >កំណត់ទូទៅ</div>
              </div>
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script>
import { reactive ,ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import ocmLogoUrl from './../../../assets/logo.jpg'
import dateFormat from 'dateformat'
/**
 * CRUD component form
 */
export default {
  name: "People" ,
  components: {
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()

    /**
     * Variables
     */    
     const model = reactive( {
      name: "setting" ,
      module: "settings" ,
      title: "ការកំណត់"
    })

    return {
      model ,
      dateFormat
    }
  }
}

</script>
<style type="text/css" scoped >

</style>