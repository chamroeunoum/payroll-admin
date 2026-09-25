<template>
  <div class="relative" >
  <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title " >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M12.5 10c0-1.65-1.35-3-3-3s-3 1.35-3 3s1.35 3 3 3s3-1.35 3-3zm-3 1c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm6.5 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2c-1.11 0-2.01.89-2 2c0 1.11.89 2 2 2zM11.99 2.01c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10s-4.48-10-10-10zM5.84 17.12c.68-.54 2.27-1.11 3.66-1.11c.07 0 .15.01.23.01c.24-.64.67-1.29 1.3-1.86A9.05 9.05 0 0 0 9.5 14c-1.3 0-3.39.45-4.73 1.43c-.5-1.04-.78-2.2-.78-3.43c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.2-.27 2.34-.75 3.37c-1-.59-2.36-.87-3.24-.87c-1.52 0-4.5.81-4.5 2.7v2.78a7.935 7.935 0 0 1-5.66-2.86z" fill="currentColor"></path></svg>
        <div class="font-moul ml-2 leading-9" v-html="model.title" ></div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex">
        <!-- New Button -->
        <!-- <div class="mt-1 ml-2 flex flex-wrap">
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="ml-1 w-7 h-7 p-1 mt-1 bg-white rounded-full border border-gray-300 cursor-pointer hover:text-green-500 duration-300" @click="toggleFilter()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
            </template>
            សម្រង់ទិន្នន័យ
          </n-tooltip>
        </div> -->
        <div class="w-3/5 md:w-2/5 relative" >
          <n-tooltip trigger="hover">
            <template #trigger>
              <div class="w-full relative" >
                <input type="text" @keypress.enter="filterRecords(false)" v-model="table.search" class="bg-gray-100 px-2 h-8 my-1 w-full rounded border border-gray-200 focus:border-blue-600 hover:border-blue-600 duration-300" placeholder="ស្វែងរក" />
                <svg class="absolute right-1 top-2 w-6 h-6 text-gray-400  cursor-pointer" @click="filterRecords(false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z" fill="currentColor"></path></g></svg>
              </div>
            </template>
            សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក
          </n-tooltip>
        </div>
        <div class="mt-1 mr-2 flex flex-wrap">
          <!-- <router-link to="/officer/import" class="border rounded h-8 py-1 px-3 duration-300 hover:border-blue-600 hover:text-blue-700 leading-6" >នាំចូល</router-link> -->
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-select placeholder="ជ្រើសរើសប្រភេទបៀវត្ស" v-model:value="salaryType" :options="[{ label : 'ពេញ១ខែ' , value : 0 }, { label : 'ពាក់កណ្ដាលដើមខែ' , value : 1 } ,{ label : 'ពាក់កណ្ដាលចុងខែ' , value : 2 }]"
              class="w-48" />
            </template>
            ប្រភេទប្រាក់ខែ
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-date-picker v-model:value="salaryDate" type="month" clearable class="w-60 ml-2 " placeholder="ជ្រើសរើសកាលបរិច្ឆែទគណនាបៀវត្ស" @update:value="filterRecords(false)"/>
            </template>
            កាលបរិច្ឆែទគណាបៀវត្ស
          </n-tooltip>
          <n-button @click="generateAllSalaries" type="primary" class="ml-2" :loading="generatingAll">
            {{ generatingAll && generateProgress > 0 ? `គណនាប្រាក់បៀវត្ស ${generateProgress}%` : 'គណនាប្រាក់បៀវត្សទាំងអស់' }}
          </n-button>
          <n-button @click="openProgressPanel" class="ml-2">
            ស្ថានភាពគណនាប្រាក់បៀវត្ស
          </n-button>
          <!-- <n-tooltip trigger="hover">
            <template #trigger>
              <div @click="showCreateNonOfficerModal()" class="flex cursor-pointer hover:text-green-500 duration-300 ml-2 leading-8" >
                <svg class="w-8 h-8 mr-1 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                មន្ត្រីគ្មានអត្តលេខ
              </div>
            </template>
            បញ្ចូលព័ត៌មានមិនមែនមន្ត្រី
          </n-tooltip> -->
          <!-- <n-tooltip trigger="hover">
            <template #trigger>
              <div @click="showCreateNonOfficerModal()" class="flex cursor-pointer hover:text-green-500 duration-300 ml-2 leading-8" >
                <svg class="w-8 h-8 mr-1 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
              </div>
            </template>
            បន្ថែមបុគ្គលិក
          </n-tooltip> -->
          <!-- <n-tooltip trigger="hover">
            <template #trigger>
              <router-link to="/setting" >
                <svg class="w-8 h-8 mx-1 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M1.91 7.383a8.491 8.491 0 0 1 1.78-3.08a.5.5 0 0 1 .54-.135l1.918.686a1 1 0 0 0 1.32-.762l.366-2.006a.5.5 0 0 1 .388-.4a8.532 8.532 0 0 1 3.555 0a.5.5 0 0 1 .387.4l.367 2.006a1 1 0 0 0 1.32.762l1.918-.686a.5.5 0 0 1 .54.136a8.491 8.491 0 0 1 1.78 3.079a.5.5 0 0 1-.152.535l-1.555 1.32a1 1 0 0 0 0 1.524l1.555 1.32a.5.5 0 0 1 .152.535a8.491 8.491 0 0 1-1.78 3.08a.5.5 0 0 1-.54.135l-1.918-.686a1 1 0 0 0-1.32.762l-.367 2.007a.5.5 0 0 1-.387.399a8.53 8.53 0 0 1-3.555 0a.5.5 0 0 1-.388-.4l-.365-2.006a1 1 0 0 0-1.32-.762l-1.919.686a.5.5 0 0 1-.54-.136a8.49 8.49 0 0 1-1.78-3.079a.5.5 0 0 1 .153-.535l1.554-1.32a1 1 0 0 0 0-1.524l-1.554-1.32a.5.5 0 0 1-.153-.535zm1.061-.006l1.294 1.098a2 2 0 0 1 0 3.05L2.97 12.623c.292.782.714 1.51 1.245 2.152l1.596-.57a2 2 0 0 1 2.64 1.525l.305 1.668a7.556 7.556 0 0 0 2.485 0l.305-1.67a1.998 1.998 0 0 1 2.64-1.524l1.597.571a7.492 7.492 0 0 0 1.245-2.152l-1.294-1.098a1.998 1.998 0 0 1 0-3.05l1.294-1.098a7.491 7.491 0 0 0-1.245-2.152l-1.596.57a2 2 0 0 1-2.64-1.524l-.306-1.669a7.555 7.555 0 0 0-2.485 0l-.304 1.669a2 2 0 0 1-2.641 1.525l-1.596-.571a7.491 7.491 0 0 0-1.245 2.152zM7.5 10a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0zm1 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 0 0-3 0z" fill="currentColor"></path></g></svg>
              </router-link>
            </template>
            ត្រឡប់ទៅ ការកំណត់
          </n-tooltip> -->
          <!-- <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="mx-1 w-7 h-7 p-1 bg-white rounded-full border border-gray-300 cursor-pointer hover:text-green-500 duration-300" @click="$router.push('/people/export')" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9c-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4l-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9c5.6-3.6 7.2-11 3.6-16.6l-84-130.4l85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z" fill="currentColor"></path></svg>
            </template>
            នាំចេញទិន្នន័យ
          </n-tooltip> -->
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative ">
      <Transition name="fade" >
        <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <table class="vcb-table" >
            <thead>
              <tr>
                <!-- <th class="w-20" ></th> -->
                <th class="text-center w-14 " >ល.រ</th>
                <th class="text-left w-16 " >កូដ</th>
                <th class="text-left " >ឈ្មោះ</th>
                <th class="text-left " >អង់គ្លេស</th>
                <th class="text-left w-16 " >ភេទ</th>
                <th class="text-center w-40 " >ថ្ងៃខែឆ្នាំកំណើត</th>
                <th class="text-left w-28 " >រៀបការ</th>
                <th class="text-left w-16 " >ចំនួនកូន</th>
                <!-- <th class="text-left w-28 " >ទូរសព្ទ</th>
                <th class="text-left w-28 " >អត្តសញ្ញាណបណ្ណ</th>
                <th class="text-left w-28 " >កម្រិតអប់រំ</th>
                <th class="text-left w-28 " >ជំនាញ</th> -->
                <th class="text-left w-28 " >ចូលធ្វើការ</th>
                <th class="text-left " >ផ្នែក</th>
                <th class="text-left w-40 " >តួនាទី</th>
                <th class="text-left w-28 " >ប្រាក់ខែ</th>
                <th class="text-center w-12" >ធ្វើការថែមម៉ោង</th>
                <!-- <th class="text-left w-28 " >ប.ស.ស.</th>
                <th class="text-left w-28 " >សៀវភៅការងារ</th>             -->
                <th>មុខងារផ្សេងៗ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(record, index) in table.records.matched" :key='index' class="item relative" >
                <!-- <td>
                  <div v-if="record.image != false && record.image != null && record.image != undefined " class="w-12 h-12 image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
                  <div v-if="record.image == false || record.image == null || record.image == undefined " class="w-12 h-12 image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div>
                </td> -->
                <td class="text-center font-bold" >{{ $toKhmer( index + 1 ) }}</td>
                <td class="text-left font-bold" >{{ $toKhmer( record.code ) }}</td>
                <td class="text-left" >{{ 
                  record.people != undefined && record.people != null 
                    ? record.people.lastname + " " + record.people.firstname
                    : '' }}</td>
                <td class="text-left" >{{ 
                  record.people != undefined && record.people != null 
                    ? record.people.enlastname + " " + record.people.enfirstname
                    : ''
                }}</td>
                <td class="text-center" >
                    <svg v-if="record.people.gender == 0" class="text-pink-500 w-8 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"></circle><path d="M10 22v-4H8l2-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1l2 6h-2v4"></path></g></svg>
                    <svg v-if="record.people.gender == 1" class="text-blue-500 w-8 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"></circle><path d="M10 22v-5l-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4l-1 1v5"></path></g></svg>
                </td>
                <td class="text-center" >{{ 
                  record.people.dob != undefined && record.people.dob != null 
                  ? $toKhmer( dateFormat( new Date( record.people.dob ) , 'dd-mm-yyyy' ) ) 
                  : ''
                }}</td>
                <td class="text-left " >
                  {{  
                  record.people.marry_status == 'married'
                    ? 'ការរួច'
                    : (
                      record.people.marry_status == 'single'
                        ? 'នៅលីវ' 
                        : 'មេមាយ/ពោះមាយ'
                    )
                }}</td>
                <td class="text-left" >{{  parseInt( record.people.kids ) > 0 ? $toKhmer( record.people.kids ) : '' }}</td>
                <!-- <td class="text-left" >{{  $toKhmer( record.people.mobile_phone ) }}</td>
                <td class="text-left" >{{  $toKhmer( record.people.nid ) }}</td>
                <td class="text-left" >{{  record.people.degree }}</td>
                <td class="text-left" >{{  record.people.major }}</td> -->
                <td class="text-center" >{{ 
                  record.official_date != undefined && record.official_date != null 
                  ? $toKhmer( dateFormat( new Date( record.official_date ) , 'dd-mm-yyyy' ) ) 
                  : ''
                }}</td>
                <td class="text-left" >{{ 
                (
                    record.category != undefined && record.category != null
                      ? record.category.name
                      : ''
                  )+
                  (
                    record.department != undefined && record.department != null
                      ? ', ' + record.department.name
                      : ''
                  )+
                  (
                    record.section != undefined && record.section != null
                      ? ', ' + record.section.name
                      : ''
                  )
                }}</td>
                <td class="text-left" >{{ 
                  record.position != undefined && record.position != null
                  ? record.position.name
                  : ''
                }}</td>
                <td class="text-left" >{{  $toKhmer( record.salary_rank ) }}</td>
                <!-- <td class="text-center" >{{ 
                  record.people.nssf_no != undefined && record.people.nssf_no != null 
                  ? $toKhmer( record.people.nssf_no )
                  : ''
                }}</td>
                <td class="text-left" >{{ $toKhmer( record.workbook_no ) }}</td> -->
                <td>
                  <n-tooltip trigger="hover" v-if="parseInt( record.allowed_ot ) > 0" >
                    <template #trigger>
                      <svg class="text-green-500 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><g fill="none"><path d="M22.707 12.707a1 1 0 0 0-1.414-1.414L14.5 18.086l-3.293-3.293a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l7.5-7.5zM16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2zM4 16C4 9.373 9.373 4 16 4s12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16z" fill="currentColor"></path></g></svg>
                    </template>
                    បុគ្គលិកនេះអាចធ្វើការថែមម៉ោងបាន។ ចុចទីនេះដើម្បីបិទការធ្វើការថែមម៉ោង។
                  </n-tooltip>
                  <n-tooltip trigger="hover" v-if="parseInt( record.allowed_ot ) == 0" >
                    <template #trigger>
                      <svg class="text-red-500 w-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372c0-89 31.3-170.8 83.5-234.8l523.3 523.3C682.8 852.7 601 884 512 884zm288.5-137.2L277.2 223.5C341.2 171.3 423 140 512 140c205.4 0 372 166.6 372 372c0 89-31.3 170.8-83.5 234.8z" fill="currentColor"></path></svg>
                    </template>
                    បុគ្គលិកនេះមិនអាចធ្វើការថែមម៉ោងបានទេ។ ចុចទីនេះដើម្បីបើកការធ្វើការថែមម៉ោង។
                  </n-tooltip>
                </td>
                <td class="relative w-32" >
                  <officer-table-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" v-bind:salaryType="salaryType" v-bind:salaryDate="salaryDate" />
                </td>
                <!-- <table-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" /> -->
              </tr>
            </tbody>
          </table>
          <!-- <div v-for="(record, index) in table.records.matched" :key='index' class="item" >
            <div class="content" >
              <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-80% bg-cover bg-center bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div>
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div v-if="record.countesy != undefined && record.countesy != null " class="w-full text-center font-moul mr-2" >{{  record.countesy.name }}</div>
                  <div v-if="record.people != undefined && record.people != null " class="w-full text-center font-moul leading-6 tracking-wider" >{{ record.people.lastname + " " + record.people.firstname }}<br/>{{ record.people.enlastname + " " + record.people.enfirstname }}</div>
                </div>
                <div class="w-full flex flex-wrap justify-between text-gray-600" >
                  <div v-if=" ( record.position != undefined && record.position != null ) || ( record.dob != undefined && record.dob != null ) " class="w-1/2 text-left text-vcb-xs my-1 leading-5 tracking-wider" >
                    {{ $toKhmer( dateFormat( new Date( record.people.dob ) , 'dd-mm-yyyy' ) ) }}<br/>
                    {{ record.position.name }}
                  </div>
                  <div v-if="record.organization != undefined && record.organization != null " class="w-1/2 text-right text-vcb-xs my-1  leading-5 tracking-wide" v-html=" record.organization.name " ></div>
                </div>
                <div v-if="record.card != null && record.card != undefined && record.card.id > 0" class="absolute left-1 top-1 text-vcb-xs text-left font-bold leading-6 tracking-wider  text-gray-500 " >{{ $toKhmer( record.card.number ) }}</div>
                <div v-if="record.card == null || record.card == undefined && ( record.organization != undefined && record.organization != null ) " class="absolute left-1 top-1 text-vcb-xs text-left font-bold leading-6 tracking-wider  text-blue-500 " v-html=" $toKhmer( ( record.organization != undefined && record.organization != null ? record.organization.prefix + '-' : '' ) + ( record.id + '' ).padStart( 4 , '0' ) )" ></div>
                <div v-if="record.code != null && record.code != undefined " class="absolute left-1 top-5 text-vcb-xs text-left font-bold leading-6 tracking-wider text-green-700 " v-html=" $toKhmer( record.code )" ></div>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
            </div>
          </div> -->
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-10 right-0 bottom-0 bg-white bg-opacity-90 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-2 right-2 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-10 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
      <!-- Pagination of crud -->
      <Transition name="slide-fade" >
        <div v-if="table.pagination.totalPages > 1 " class="fixed left-0 right-0 bottom-1 flex flex-wrap" >
          <div class="vcb-table-pagination bg-blue-300 mx-auto">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-popselect 
                  trigger="click"
                  v-model:value="table.pagination.perPage"
                  :options="[
                    { label: 5 , value: 5 } ,
                    { label: 10 , value: 10 } ,
                    { label: 20 , value: 20 } ,
                    { label: 30 , value: 30 } ,
                    { label: 40 , value: 40 } ,
                    { label: 50 , value: 50 } ,
                    { label: 100 , value: 100 } ,
                    { label: 200 , value: 200 } ,
                    { label: 500 , value: 500 } ,
                  ]"
                  size="small"
                  scrollable
                  @update:value="goTo(1)"
                >
                  <div class="cursor-pointer font-pvh rounded-full p-2 px-4 border border-gray-200 text-blue-600" >{{ $toKhmer( table.pagination.perPage ) }}</div>
                </n-popselect>
              </template>
              ចំនួនព័ត៌មានបង្ហាញម្ដង
            </n-tooltip>
            <!-- <n-tooltip trigger="hover">
              <template #trigger>
                <div class="vcb-table-pagination-info font-pvh " >{{ table.pagination.totalRecords > 0 ? $toKhmer( table.pagination.totalRecords ) + " ព័ត៌មាន" : "" }}</div>
              </template>
              ចំនួនព័ត៌មានសរុប
            </n-tooltip> -->
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="vcb-table-pagination-info font-pvh " >{{ table.pagination.totalPages > 0 ? $toKhmer( table.pagination.totalPages ) + " ទំព័រ" : "" }}</div>
              </template>
              ចំនួនទំព័រសរុប
            </n-tooltip>
            <div v-for="(page, index) in table.pagination.buttons" :key="index" :class=" (table.pagination.page == page ? ' vcb-pagination-page-active ' : ' vcb-pagination-page ' )" @click="table.pagination.page == page ? false : goTo(page) " >
              <n-tooltip trigger="hover">
                <template #trigger>
                  <div class="leading-8 text-md font-pvh " >{{ $toKhmer( page ) }} </div>
                </template>
                ទំព័រទី {{ $toKhmer( page ) }}
              </n-tooltip>
            </div>
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page > 1 " class="vcb-pagination-page " v-html='"<"' @click="previous()" ></div>
            </Transition>
            <Transition name="slide-fade" >
              <div v-if="table.pagination.page < table.pagination.totalPages " class="vcb-pagination-page " v-html='">"' @click="next()" ></div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
    <!-- Form create account -->
    <!-- Filter panel of crud -->
    <Transition name="slide-fade" >
      <div v-if="filter" class="vcb-filters-panel">
        <svg @click="toggleFilter()" class="absolute bg-white rounded-full shadow p-2 right-2 top-2 w-10 h-10 border border-gray-200 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
        <div class="filter-title font-moul" >សូមជ្រើសរើសលក្ខណ សម្រង់ទិន្នន័យ៖</div>
        <div class="filter-actions" >
          <div class="filter-action" >
            <!-- Positions -->
            <n-select v-model:value="selectedPositions" filterable clearable multiple @update:value="filterRecords(false)" placeholder="សូមជ្រើសរើស មុខតំណែង" :options="optionPositions" />
          </div>
          <div class="filter-action" >
            <!-- Organizations -->
            <n-select v-model:value="selectedOrganizations" filterable clearable multiple @update:value="filterRecords(false)" placeholder="សូមជ្រើសើស ស្ថាប័ន / អង្គភាព" :options="optionOrganizations" />
          </div>
        </div>
      </div>
    </Transition>

    <!-- ------------------------------------------------------------------
         Salary generation progress.

         Generation runs on the queue worker, so this panel walks the user
         through: (1) the queue, (2) the detail of each job, (3) the related
         information, (4) what happens on success / what to do on error.
         ------------------------------------------------------------------ -->
    <n-drawer v-model:show="progressPanel" :width="640" placement="right" :trap-focus="false">
      <n-drawer-content closable :native-scrollbar="false">
        <template #header>
          <span class="cw-title">ស្ថានភាពគណនាប្រាក់បៀវត្ស</span>
        </template>

        <!-- 1. Queue -->
        <div class="cw-section">
          <div class="cw-head">
            <span>១. ជួរការងារ ({{ runs.length }})</span>
            <span class="flex items-center">
              <n-tag :type="workerAlive ? 'success' : 'error'" size="small" :bordered="false" class="mr-2">
                {{ workerAlive ? 'ម៉ាស៊ីនគណនាដំណើរការ' : 'ម៉ាស៊ីនគណនាមិនដំណើរការ' }}
              </n-tag>
              <n-button size="tiny" :loading="runsLoading" @click="refreshRuns">ធ្វើឱ្យទាន់សម័យ</n-button>
            </span>
          </div>

          <div class="cw-runs">
            <div v-for="run in runs" :key="run.run_id"
                 class="cw-run" :class="{ 'cw-run-active': run.run_id === selectedRunId }"
                 @click="selectRun( run.run_id )">
              <n-progress type="circle" :percentage="run.percent || 0" :width="40" :stroke-width="6"
                          :status="run.status === 'failed' ? 'error' : ( run.status === 'done' ? 'success' : 'default' )" />
              <div class="cw-run-body">
                <div class="flex items-center">
                  <n-tag :type="statusType( run.status )" size="tiny" :bordered="false">{{ statusLabel( run.status ) }}</n-tag>
                  <span class="cw-run-code">{{ ( run.run_id || '' ).substring( 0, 8 ) }}</span>
                </div>
                <div class="cw-run-meta">{{ run.period_start }} → {{ run.period_end }} · {{ modeLabel( run.mode ) }}</div>
                <div class="cw-run-meta">{{ run.started_at || run.queued_at || '-' }}<template v-if="run.finished_at"> · ចំណាយ {{ formatElapsed( run.elapsed_seconds ) }}</template></div>
              </div>
            </div>
            <n-empty v-if="runs.length === 0 && ! runsLoading" size="small" description="មិនមានការងារក្នុងជួរទេ" class="py-4" />
          </div>
          <div class="cw-run-meta mt-1">ការងាររង់ចាំក្នុងជួរ៖ {{ queueInfo.pending }} · ការងារបរាជ័យ៖ {{ queueInfo.failed }}</div>
        </div>

        <template v-if="selectedRun">
          <!-- 2. Detail of the selected job -->
          <div class="cw-section">
            <div class="cw-head">
              <span>២. ព័ត៌មានលម្អិតនៃការងារ</span>
              <n-tag :type="statusType( selectedStatus )" size="small" :bordered="false">{{ statusLabel( selectedStatus ) }}</n-tag>
            </div>

            <n-timeline class="mb-3">
              <n-timeline-item v-for="step in runSteps" :key="step.index"
                               :title="step.title" :content="step.description" :status="step.status" size="small" />
            </n-timeline>

            <n-progress type="line" :percentage="selectedRun.percent || 0"
                        :status="selectedIsFailed ? 'error' : ( selectedIsDone ? 'success' : 'default' )"
                        :indicator-placement="'inside'" />
            <div v-if="selectedStatus === 'running' && selectedRun.current_officer_code" class="cw-run-meta mt-1">
              កំពុងគណនា៖ {{ selectedRun.current_officer_code }}
            </div>

            <div class="cw-counters mt-3">
              <div class="cw-counter"><div class="cw-counter-value">{{ selectedRun.total || 0 }}</div><div class="cw-counter-label">សរុប</div></div>
              <div class="cw-counter"><div class="cw-counter-value">{{ selectedRun.processed || 0 }}</div><div class="cw-counter-label">ដំណើរការ</div></div>
              <div class="cw-counter"><div class="cw-counter-value text-green-600">{{ selectedRun.succeeded || 0 }}</div><div class="cw-counter-label">បានបង្កើត</div></div>
              <div class="cw-counter"><div class="cw-counter-value text-gray-500">{{ selectedRun.skipped || 0 }}</div><div class="cw-counter-label">រំលង</div></div>
              <div class="cw-counter"><div class="cw-counter-value text-red-600">{{ selectedRun.failed || 0 }}</div><div class="cw-counter-label">បរាជ័យ</div></div>
            </div>

            <div class="cw-info mt-3">
              <div class="cw-info-label">ចាប់ផ្ដើម</div><div class="cw-info-value">{{ selectedRun.started_at || selectedRun.queued_at || '-' }}</div>
              <div class="cw-info-label">ធ្វើបច្ចុប្បន្នភាព</div><div class="cw-info-value">{{ selectedRun.updated_at || '-' }}</div>
              <div class="cw-info-label">បញ្ចប់</div><div class="cw-info-value">{{ selectedRun.finished_at || '-' }}</div>
              <div class="cw-info-label">រយៈពេល</div><div class="cw-info-value">{{ formatElapsed( selectedRun.elapsed_seconds ) }}</div>
              <div class="cw-info-label">អ្នកចាប់ផ្ដើម</div><div class="cw-info-value">{{ selectedRun.started_by_name || '-' }}</div>
              <div class="cw-info-label">Run ID</div><div class="cw-info-value">{{ selectedRun.run_id }}</div>
            </div>

            <div v-if="failureList.length > 0" class="mt-3">
              <div class="cw-head"><span>បុគ្គលិកដែលគណនាមិនបាន ({{ selectedRun.failed }})</span></div>
              <div class="cw-failures">
                <div v-for="( failure, index ) in failureList" :key="index" class="cw-failure">
                  <b>{{ failure.code || '-' }}</b> · {{ failure.reason || '-' }}
                </div>
              </div>
              <div v-if="selectedRun.failed > failureList.length" class="cw-run-meta mt-1">
                បង្ហាញតែ {{ failureList.length }} ក្នុងចំណោម {{ selectedRun.failed }}។ សូមមើល log សម្រាប់ព័ត៌មានពេញលេញ។
              </div>
            </div>
          </div>

          <!-- 3. Related information -->
          <div class="cw-section">
            <div class="cw-head"><span>៣. ព័ត៌មានពាក់ព័ន្ធ</span></div>
            <div class="cw-info">
              <template v-for="field in relatedFields" :key="field.label">
                <div class="cw-info-label">{{ field.label }}</div>
                <div class="cw-info-value">{{ field.value }}</div>
              </template>
            </div>
          </div>

          <!-- 4. Outcome and what to do next -->
          <div class="cw-section">
            <div class="cw-head"><span>៤. អ្វីដែលកើតឡើង និងអ្វីដែលត្រូវធ្វើ</span></div>

            <n-alert v-if="! workerAlive && ! selectedIsDone && ! selectedIsFailed" type="warning" :bordered="false" class="mb-2">
              <b>ម៉ាស៊ីនគណនាផ្ទៃខាងក្រោយមិនដំណើរការ។</b>
              ការងារនឹងនៅរង់ចាំក្នុងជួររហូតដល់ម៉ាស៊ីនគណនាដំណើរការឡើងវិញ។ សូមទាក់ទងអ្នកគ្រប់គ្រងប្រព័ន្ធដើម្បីចាប់ផ្ដើមសេវា `oandm-queue`។
            </n-alert>

            <n-alert v-if="selectedStatus === 'queued' || selectedStatus === 'running'" type="info" :bordered="false">
              <b>កំពុងដំណើរការ។</b>
              លោកអ្នកអាចបិទទំព័រនេះបាន ព្រោះការគណនាដំណើរការនៅផ្ទៃខាងក្រោយ ហើយនឹងបន្តទោះបិទកម្មវិធីរុករក។
              លទ្ធផលនឹងបង្ហាញនៅពេលរួចរាល់។
            </n-alert>

            <n-alert v-if="selectedIsDone" type="success" :bordered="false">
              <b>គណនាប្រាក់ខែរួចរាល់។</b>
              បានបង្កើត {{ selectedRun.succeeded || 0 }} នាក់ · រំលង {{ selectedRun.skipped || 0 }} នាក់ · បរាជ័យ {{ selectedRun.failed || 0 }} នាក់។
              ប្រាក់បៀវត្សត្រូវបានបូកសរុបរួចរាល់។ សូមពិនិត្យតារាងខាងក្រោយ រួចបន្តទៅជំហានបន្ទាប់។
              <div v-if="( selectedRun.failed || 0 ) > 0" class="mt-1">
                មានបុគ្គលិក {{ selectedRun.failed }} នាក់ដែលគណនាមិនបាន។ សូមពិនិត្យបញ្ជីខាងលើ កែទិន្នន័យ រួចគណនាឡើងវិញ។
              </div>
            </n-alert>

            <div v-if="selectedIsFailed">
              <n-alert type="error" :bordered="false">
                <b>ការគណនាបរាជ័យ។</b>
                {{ selectedRun.error || selectedRun.message || 'មានបញ្ហាមិនស្គាល់' }}
              </n-alert>
              <div class="cw-help">
                <div class="cw-help-title">អ្វីដែលលោកអ្នកអាចធ្វើ៖</div>
                <ol class="cw-help-list">
                  <li>ពិនិត្យបញ្ជីបរាជ័យខាងលើ ដើម្បីដឹងមូលហេតុ។</li>
                  <li>បើជាបញ្ហាទិន្នន័យបុគ្គលិក សូមកែទិន្នន័យនោះជាមុន។</li>
                  <li>ចុច «ព្យាយាមម្ដងទៀត» ដើម្បីគណនាឡើងវិញ។ ការគណនាមិនបង្កើតប្រាក់ខែស្ទួនទេ។</li>
                  <li>បើនៅតែបរាជ័យ សូមទាក់ទងអ្នកគ្រប់គ្រងប្រព័ន្ធ ដោយផ្ដល់ Run ID ខាងលើ។</li>
                </ol>
                <n-button type="primary" size="small" class="mt-2" @click="retryRun">ព្យាយាមម្ដងទៀត</n-button>
              </div>
            </div>
          </div>
        </template>

        <n-empty v-if="! selectedRun && ! runsLoading" size="small" description="សូមជ្រើសរើសការងារមួយពីជួរខាងលើ" class="py-6" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script>
import { reactive ,ref , computed , watch , onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import { getKhmer } from '../../../plugins/kh/number.js'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import ocmLogoUrl from './../../../assets/logo.jpg'
import dateFormat from 'dateformat'
/**
 * CRUD component form
 */
// import CreateForm from './../widgets/create.vue'
// import CreateNonOfficerForm from './../widgets/createnonofficer.vue'
import OfficerTableActionsForm from './actions/table-action-officer.vue'
export default {
  watch: {
    
  },
  name: "People" ,
  components: {
    QrcodeVue ,
    Vue3Barcode,
    /**
     * Forms
     */
    OfficerTableActionsForm
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()

    const salaryType = ref(0)
    const salaryDate = ref( Date.now() )
    const generatingAll = ref(false)
    const generateProgress = ref(0)
    const peopleIds = ref( 
      route.params.ids != undefined && route.params.ids.trim().length > 0 ? route.params.ids.split(',') : null
    )

    /**
     * Variables
     */    
    const model = reactive( {
      name: "officer" ,
      module: "officers" ,
      title: "គណនាប្រាក់បៀវត្សបុគ្គលិក"
    })
    const table = reactive( {
      loading: false ,
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 20 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })

    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( function(){
          table.pagination.page = 1
          getRecords()
        } , 500 )
      }
    }

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        positions: selectedPositions.value ,
        organizations: selectedOrganizations.value ,
        ids: peopleIds.value ,
        attendance_date: dateFormat( new Date( salaryDate.value ), 'yyyy-mm-dd' )
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        
        var paginationNumberList = 10
        if( ( table.pagination.page - ( parseInt( paginationNumberList / 2 ) + 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > paginationNumberList ? paginationNumberList : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page - parseInt( paginationNumberList / 2 )
          table.pagination.end = table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + parseInt( paginationNumberList / 2 )
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          i <= table.pagination.totalPages ? table.pagination.buttons.push(i) : false
        }

        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }
    
    function closeTableLoading(){
      table.loading = false
    }

    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }

    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }

    /**
     * Create modal handling
     */
    var createModal = reactive({show:false})
    function showCreateModal(){
      createModal.show = true
    }

    function closeCreateModal( actionStatus ){
      createModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    /**
     * Create non officer modal handling
     */
    var createNonOfficerModal = reactive({show:false})
    function showCreateNonOfficerModal(){
      createNonOfficerModal.show = true
    }

    function closeCreateNonOfficerModal( actionStatus ){
      createNonOfficerModal.show = false
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    function closeActions( actionStatus ){
      if( parseInt( actionStatus ) > 0 ) getRecords()
    }

    function generateAllSalaries(){
      generatingAll.value = true
      generateProgress.value = 0
      const modeMap = ['full', 'mid', 'end']
      const date = dateFormat( new Date( salaryDate.value ) , 'dd-mm-yyyy' )
      const mode = modeMap[ salaryType.value ] || 'full'

      // Salary generation runs on the queue worker, not inside this request, so it
      // is not bounded by PHP max_execution_time / the nginx gateway timeout and it
      // keeps running even if this tab is closed. The API returns a run id and the
      // client polls its progress.
      store.dispatch('payroll/generateSalaries',{ date: date, mode: mode }).then( res => {
        if( ! res.data.ok ){
          throw new Error( res.data.message || 'មានបញ្ហាក្នុងការចាប់ផ្ដើមគណនាប្រាក់បៀវត្ស' )
        }
        const runId = res.data.run_id
        if( res.data.progress ) generateProgress.value = res.data.progress.percent || 0
        // Show the queue and the live steps for the run that just started.
        progressPanel.value = true
        refreshRuns()
        pollGenerateStatus( runId, res.data.worker_alive, 0 )
      }).catch( err => {
        generatingAll.value = false
        generateProgress.value = 0
        const msg = err.response?.data?.message || err.message || 'មានបញ្ហាក្នុងការចាប់ផ្ដើមគណនាប្រាក់បៀវត្ស'
        notify.error({
          title: 'គណនាប្រាក់បៀវត្ស',
          description: msg,
          duration: 5000
        })
      })
    }

    // Poll the queued run until it finishes. `workerAlive` is the worker heartbeat
    // reported by the API; if the job stays 'queued' while no worker is alive we
    // warn instead of spinning forever.
    function pollGenerateStatus( runId, workerAlive, ticks ){
      const maxTicks = 300         // ~10 minutes at 2s per poll
      const maxQueuedTicks = 10    // ~20s still 'queued' -> worker likely not running

      store.dispatch('payroll/generateSalariesStatus', runId ).then( res => {
        const progress = res.data.progress || {}
        const alive = res.data.worker_alive != undefined ? res.data.worker_alive : workerAlive
        generateProgress.value = progress.percent || 0

        if( progress.status === 'done' ){
          generatingAll.value = false
          generateProgress.value = 100
          notify.success({
            title: 'គណនាប្រាក់បៀវត្ស',
            description: progress.message || 'គណនាប្រាក់បៀវត្សទាំងអស់រួចរាល់',
            duration: 3000
          })
          getRecords()
          return
        }

        if( progress.status === 'failed' ){
          generatingAll.value = false
          generateProgress.value = 0
          notify.error({
            title: 'គណនាប្រាក់បៀវត្ស',
            description: progress.error || progress.message || 'មានបញ្ហាក្នុងពេលគណនាប្រាក់បៀវត្ស',
            duration: 5000
          })
          return
        }

        if( ticks >= maxTicks ){
          generatingAll.value = false
          generateProgress.value = 0
          notify.error({
            title: 'គណនាប្រាក់បៀវត្ស',
            description: 'ការគណនាចំណាយពេលយូរពេក។ សូមពិនិត្យលទ្ធផលម្ដងទៀតក្រោយ។',
            duration: 6000
          })
          return
        }

        // Job never left the queue and the worker is not checking in.
        if( progress.status === 'queued' && alive === false && ticks >= maxQueuedTicks ){
          generatingAll.value = false
          generateProgress.value = 0
          notify.error({
            title: 'គណនាប្រាក់បៀវត្ស',
            description: 'ម៉ាស៊ីនគណនាផ្ទៃខាងក្រោយ (queue worker) មិនដំណើរការ។ សូមទាក់ទងអ្នកគ្រប់គ្រងប្រព័ន្ធ។',
            duration: 8000
          })
          return
        }

        setTimeout( () => pollGenerateStatus( runId, alive, ticks + 1 ), 2000 )
      }).catch( () => {
        // Transient poll error: retry a few times before giving up.
        if( ticks >= maxQueuedTicks ){
          generatingAll.value = false
          generateProgress.value = 0
          notify.error({
            title: 'គណនាប្រាក់បៀវត្ស',
            description: 'មិនអាចតាមដានស្ថានភាពការគណនាបានទេ។ សូមព្យាយាមម្ដងទៀត។',
            duration: 6000
          })
          return
        }
        setTimeout( () => pollGenerateStatus( runId, workerAlive, ticks + 1 ), 2000 )
      })
    }

    /**
     * Load positions
     */
    const selectedPositions = ref(null)
    const optionPositions = computed( () => {
      let positions = Array.isArray( store.getters['position/getRecords'] ) && store.getters['position/getRecords'].length > 0 ? store.getters['position/getRecords'] : []
      positions = positions.map( ( p ) => { return { label : p.name , value : p.id } })
      positions.unshift({ label: 'សូមជ្រើសរើស មុនតំណែង' , value: null })
      return positions
    })
    function getPositions(){
      store.dispatch('position/list',{
        page: 1 ,
        perPage: 1000 ,
        search: ''
      }).then(res=>{
        store.commit('position/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានតំណែង' ,
          description: 'មានបញ្ហាពេលអានតំណែង។'
        })
        console.log( err )
      })
    }

    /**
     * Load positions
     */
    const selectedOrganizations = ref(null)
    const optionOrganizations = computed( () => {
      let organizations = Array.isArray( store.getters['organizations/getRecords'] ) && store.getters['organizations/getRecords'].length > 0 ? store.getters['organizations/getRecords'] : []
      organizations = organizations.map( ( p ) => { return { label : p.name , value : p.id } })
      organizations.unshift({ label: 'សូមជ្រើសរើស ស្ថាប័ន / អង្គភាព' , value: null })
      return organizations
    })
    function getOrganizations(){
      store.dispatch('organizations/list',{
        page: 1 ,
        perPage: 1000 ,
        search: '' ,
        id: 0
      }).then(res=>{
        store.commit('organizations/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានអង្គភាព' ,
          description: 'មានបញ្ហាពេលអានអានអង្គភាព។'
        })
        console.log( err )
      })
    }

    /**
     * Load positions
     */
     const selectedCountesies = ref(null)
    const optionCountesies = computed( () => {
      let countesies = Array.isArray( store.getters['countesy/getRecords'] ) && store.getters['countesy/getRecords'].length > 0 ? store.getters['countesy/getRecords'] : []
      countesies = countesies.map( ( p ) => { return { label : p.name , value : p.id } })
      countesies.unshift({ label: 'សូមជ្រើសរើស ងារ' , value: null })
      return countesies
    })
    function getCountesies(){
      store.dispatch('countesy/list',{
        page: 1 ,
        perPage: 1000 ,
        search: ''
      }).then(res=>{
        store.commit('countesy/setRecords',res.data.records)
      }).catch(err =>{
        notify.error({
          title: 'អានងារ' ,
          description: 'មានបញ្ហាពេលអានងារ។'
        })
        console.log( err )
      })
    }

    const filter = ref(false)    
    function toggleFilter(){
      filter.value = !filter.value
    }
    /**
     * Initial the data
     */
    getRecords()
    getPositions()
    getOrganizations()
    getCountesies()


    /* ------------------------------------------------------------------
     * Salary generation progress panel.
     *
     * Generation runs on the queue worker, so this panel answers the four
     * questions the user has: (1) which jobs are queued, (2) what each job is
     * doing right now, (3) the related information, (4) what happened on
     * success and what to do on failure.
     * ------------------------------------------------------------------ */
    const progressPanel = ref(false)
    const runs = ref([])
    const runsLoading = ref(false)
    const selectedRunId = ref(null)
    const runDetail = ref(null)
    const runRelated = ref(null)
    const queueInfo = ref({ pending: 0, failed: 0 })
    const workerAlive = ref(true)

    // The stages the backend writes into the run state, in order.
    const STAGE_ORDER = ['queued', 'processing', 'finalizing', 'done']

    // The run shown in the detail section: the polled state when the API still
    // has it, otherwise the summary kept in the queue list.
    const selectedRun = computed( () => {
      if( runDetail.value && runDetail.value.run_id === selectedRunId.value ) return runDetail.value
      return runs.value.find( run => run.run_id === selectedRunId.value ) || null
    })

    const selectedStatus = computed( () => ( selectedRun.value || {} ).status || 'queued' )
    const selectedIsDone = computed( () => selectedStatus.value === 'done' )
    const selectedIsFailed = computed( () => selectedStatus.value === 'failed' )
    const failureList = computed( () => ( selectedRun.value || {} ).failures || [] )

    // Steps derived from the stage the backend actually reached, so the timeline
    // never shows progress the job has not made.
    const runSteps = computed( () => {
      const run = selectedRun.value || {}
      const failed = run.status === 'failed'
      const at = failed
        ? Math.max( STAGE_ORDER.indexOf( run.failed_at_stage || 'processing' ), 0 )
        : ( run.status === 'done' ? STAGE_ORDER.length : Math.max( STAGE_ORDER.indexOf( run.stage || 'queued' ), 0 ) )

      const labels = [
        { title: 'ដាក់ក្នុងជួររង់ចាំ', description: 'ការងារត្រូវបានចុះបញ្ជី រង់ចាំម៉ាស៊ីនគណនាមកដំណើរការ' },
        { title: 'គណនាប្រាក់ខែបុគ្គលិក', description: 'គណនាប្រាក់ខែម្នាក់ៗ តាមទិន្នន័យវត្តមានរបស់ខែ' },
        { title: 'បូកសរុបប្រាក់បៀវត្ស', description: 'បូកសរុបតម្លៃសរុបរបស់បញ្ជីប្រាក់បៀវត្ស' },
        { title: 'រួចរាល់', description: 'ប្រាក់ខែត្រូវបានរក្សាទុកក្នុងប្រព័ន្ធ' }
      ]

      return labels.map( ( label, index ) => {
        let status = 'wait'
        if( failed && index === at ) status = 'error'
        else if( index < at ) status = 'finish'
        else if( index === at ) status = 'process'
        return { ...label, index, status }
      })
    })

    // Related information: the snapshot taken when the run started, the live queue
    // counters, and the payroll totals once the run finished.
    const relatedFields = computed( () => {
      const info = runRelated.value || {}
      const run = selectedRun.value || {}
      const fields = [
        { label: 'លេខបញ្ជីប្រាក់បៀវត្ស', value: run.payroll_id },
        { label: 'រយៈពេល', value: run.period_start ? `${run.period_start} → ${run.period_end}` : null },
        { label: 'ប្រភេទគណនា', value: run.mode ? modeLabel( run.mode ) : null },
        { label: 'បុគ្គលិកត្រូវគណនា', value: info.eligible_officers },
        { label: 'ថ្ងៃមានវត្តមាន', value: info.attendance_days },
        { label: 'កំណត់ត្រាវត្តមាន', value: info.attendance_records },
        { label: 'ការងាររង់ចាំក្នុងជួរ', value: info.queue_pending },
        { label: 'ការងារបរាជ័យក្នុងជួរ', value: info.queue_failed },
        { label: 'ម៉ាស៊ីនគណនាផ្ទៃខាងក្រោយ', value: info.worker_alive === true ? 'ដំណើរការ' : 'មិនដំណើរការ' }
      ]

      if( info.payroll_summary ){
        fields.push({ label: 'ប្រាក់ខែដែលបានបង្កើត', value: info.payroll_summary.salaries })
        fields.push({ label: 'ទឹកប្រាក់សុទ្ធសរុប', value: formatMoney( info.payroll_summary.net_total ) })
      }

      return fields.filter( field => field.value !== null && field.value !== undefined && field.value !== '' )
    })

    function statusLabel( status ){
      return { queued: 'រង់ចាំ', running: 'កំពុងដំណើរការ', done: 'រួចរាល់', failed: 'បរាជ័យ' }[ status ] || status || '-'
    }

    function statusType( status ){
      return { queued: 'warning', running: 'info', done: 'success', failed: 'error' }[ status ] || 'default'
    }

    function modeLabel( mode ){
      return { full: 'ពេញខែ', mid: 'ដើមខែ', end: 'ចុងខែ' }[ mode ] || mode
    }

    function formatElapsed( seconds ){
      const total = parseInt( seconds || 0 )
      if( ! total || total <= 0 ) return '-'
      const minutes = Math.floor( total / 60 )
      const rest = total % 60
      return minutes > 0 ? `${minutes} នាទី ${rest} វិនាទី` : `${rest} វិនាទី`
    }

    function formatMoney( amount ){
      const value = Number( amount || 0 )
      return value.toLocaleString( 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 } )
    }

    function openProgressPanel(){
      progressPanel.value = true
      refreshRuns()
    }

    function refreshRuns(){
      runsLoading.value = true
      return store.dispatch('payroll/generateSalariesRuns').then( res => {
        runs.value = res.data.runs || []
        queueInfo.value = res.data.queue || { pending: 0, failed: 0 }
        workerAlive.value = res.data.worker_alive === true

        const stillListed = runs.value.some( run => run.run_id === selectedRunId.value )
        if( ! stillListed ){
          // Follow the newest run when the previously selected one rolled off.
          selectRun( runs.value.length > 0 ? runs.value[0].run_id : null )
        } else {
          // Otherwise keep the selected run's detail fresh.
          loadRunDetail( selectedRunId.value )
        }
      }).catch( () => {
        notify.error({
          title: 'ជួរការងារ',
          description: 'មិនអាចទាញយកស្ថានភាពជួរការងារបានទេ។ សូមព្យាយាមម្ដងទៀត។',
          duration: 4000
        })
      }).finally( () => { runsLoading.value = false })
    }

    function selectRun( runId ){
      selectedRunId.value = runId
      runDetail.value = null
      runRelated.value = null
      if( ! runId ) return
      loadRunDetail( runId )
    }

    function loadRunDetail( runId ){
      store.dispatch('payroll/generateSalariesStatus', runId ).then( res => {
        if( res.data.ok ){
          runDetail.value = res.data.progress
          runRelated.value = res.data.related
          if( res.data.worker_alive != undefined ) workerAlive.value = res.data.worker_alive
        }
      }).catch( () => {
        // The detailed state is kept for 6 hours. After that the summary in the
        // list is still accurate, so this is not worth interrupting the user.
        runDetail.value = null
        runRelated.value = null
      })
    }

    // Re-run the same period the selected job used.
    function retryRun(){
      const run = selectedRun.value
      if( ! run ) return
      salaryType.value = typeof run.mode_index === 'number' ? run.mode_index : 0
      if( run.date ) salaryDate.value = new Date( run.date ).getTime()
      generateAllSalaries()
    }

    let panelTimer = null

    function startPanelPolling(){
      stopPanelPolling()
      panelTimer = setInterval( () => {
        if( ! progressPanel.value ){ stopPanelPolling(); return }
        const run = selectedRun.value || {}
        // Stop polling a run that already reached a terminal state; the Refresh
        // button is still there for a manual reload.
        if( run.status === 'done' || run.status === 'failed' ) return
        refreshRuns()
      }, 3000 )
    }

    function stopPanelPolling(){
      if( panelTimer ){ clearInterval( panelTimer ); panelTimer = null }
    }

    watch( progressPanel, ( isOpen ) => { if( isOpen ) startPanelPolling(); else stopPanelPolling() } )
    onUnmounted( stopPanelPolling )

    return {
      /**
       * Variables
       */
      model ,
      table ,
      ocmLogoUrl ,
      salaryDate ,
      salaryType ,
      generatingAll ,
      generateProgress ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Creating
       */
      createModal ,
      showCreateModal ,
      closeCreateModal ,
      /**
       * Creating non officer
       */
      createNonOfficerModal ,
      showCreateNonOfficerModal ,
      closeCreateNonOfficerModal ,
      closeActions ,
      generateAllSalaries ,
      /**
       * Functions
       */
      toggleFilter ,
      filterRecords ,
      filter ,
      /**
      * Filters
      */
      optionPositions ,
      selectedPositions ,
      selectedCountesies ,
      optionOrganizations ,
      selectedOrganizations ,
      getKhmer ,
      dateFormat ,
      /**
       * Salary generation progress panel
       */
      progressPanel ,
      runs ,
      runsLoading ,
      selectedRunId ,
      selectedRun ,
      selectedStatus ,
      selectedIsDone ,
      selectedIsFailed ,
      failureList ,
      runSteps ,
      relatedFields ,
      queueInfo ,
      workerAlive ,
      openProgressPanel ,
      refreshRuns ,
      selectRun ,
      retryRun ,
      statusLabel ,
      statusType ,
      modeLabel ,
      formatElapsed
    }
  }
}

</script>
<style type="text/css" scoped >
.vcb-thumbnail {
  @apply flex flex-wrap justify-center;
}
.vcb-thumbnail .item {
  @apply xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/3 w-1/2 p-2 ;
}
.vcb-thumbnail .item .content {
  @apply border rounded-lg hover:shadow duration-500 p-4 pt-8 relative hover:scale-105 transform-gpu bg-white hover:bg-yellow-100;
}
.image {
  @apply rounded-full  p-2 flex-none mx-auto overflow-hidden ;
}
.vcb-filters-panel {
  @apply fixed left-0 top-10 right-0 bottom-0 bg-opacity-60 bg-white ;
}
.vcb-filters-panel .filter-title {
  @apply w-full text-left p-4 bg-white rounded-lg ;
}
.vcb-filters-panel .filter-actions {
  @apply w-full text-left p-4 flex flex-wrap justify-center;
}
.vcb-filters-panel .filter-actions .filter-action {
  @apply p-2 m-2 bg-white rounded-lg shadow border border-gray-300 w-4/6 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-2/6 ;
}
.vcb-table {
  @apply p-2 w-full ;
}
.vcb-table tr th {
  @apply p-2 border-b border-gray-200 relative ;
}
.vcb-table tr td {
  @apply p-2 relative border-b border-gray-200;
}

/* --- Salary generation progress panel --- */
.cw-title {
  @apply font-bold;
}
.cw-section {
  @apply mb-6 pb-5 border-b border-gray-100;
}
.cw-section:last-child {
  @apply mb-0 pb-0 border-b-0;
}
.cw-head {
  @apply flex items-center justify-between mb-2 font-bold text-sm;
}
.cw-runs {
  @apply border border-gray-200 rounded max-h-64 overflow-auto;
}
.cw-run {
  @apply flex items-center p-2 cursor-pointer transition-colors duration-200 border-t border-gray-100;
}
.cw-run:first-child {
  @apply border-t-0;
}
.cw-run:hover {
  @apply bg-gray-50;
}
.cw-run-active {
  @apply bg-blue-50;
}
.cw-run-body {
  @apply ml-3 flex-grow;
  min-width: 0;
}
.cw-run-code {
  @apply text-xs text-gray-500 ml-2;
  font-family: monospace;
}
.cw-run-meta {
  @apply text-xs text-gray-500 truncate;
}
.cw-counters {
  @apply grid gap-2 text-center;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.cw-counter {
  @apply border border-gray-200 rounded py-2 px-1;
}
.cw-counter-value {
  @apply text-lg font-bold leading-tight;
}
.cw-counter-label {
  @apply text-xs text-gray-500;
}
.cw-info {
  @apply grid gap-x-4 gap-y-1 text-sm;
  grid-template-columns: 160px 1fr;
}
.cw-info-label {
  @apply text-gray-500;
}
.cw-info-value {
  @apply font-medium;
  word-break: break-all;
}
.cw-failures {
  @apply max-h-40 overflow-auto;
}
.cw-failure {
  @apply text-xs pl-2 py-1 mb-1 border-l-2 border-red-300;
}
.cw-help {
  @apply mt-3 p-3 rounded bg-gray-50 text-sm;
}
.cw-help-title {
  @apply font-bold mb-1;
}
.cw-help-list {
  @apply list-decimal ml-5;
}
.cw-help-list li {
  @apply mb-1;
}
</style>