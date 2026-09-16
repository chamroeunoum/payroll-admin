<template>
  <!-- Bulk import of the monthly adjustments of many staff -->
  <div class="vcb-pop-import font-ktr">
    <n-modal v-bind:show="show" :on-esc="maskOrEscClick" :on-mask-click="maskOrEscClick" :on-after-enter="initial" transform-origin="center">
      <n-card class="w-11/12 md:w-10/12 xl:w-9/12" title="នាំចូលគោលការប្រែប្រួលប្រាក់ខែប្រចាំខែ (Excel)" :bordered="false" size="small">
        <template #header-extra>
          <n-button type="primary" :loading="importing" :disabled="!canImport" @click="submit()" >
            នាំចូល
          </n-button>
        </template>

        <div class="w-full text-left">
          <!-- 1. The month every row of the file is written into -->
          <div class="w-full flex flex-wrap items-center border-b border-gray-200 py-2">
            <div class="w-48 font-bold" >ខែដែលត្រូវនាំចូល <span class="text-red-600" >*</span></div>
            <n-date-picker
              v-model:value="targetDate"
              type="month"
              clearable
              :disabled="importing"
              class="w-56"
            />
            <div v-if="targetDate != null" class="ml-3 text-gray-500" >
              នឹងរក្សារទុកចូលខែ ៖ {{ $toKhmer( periodLabel ) }}
            </div>
            <div v-else class="ml-3 text-red-600" >
              សូមជ្រើសរើសខែជាមុនសិន។
            </div>
          </div>

          <!-- 2. The file -->
          <div class="w-full flex flex-wrap items-center border-b border-gray-200 py-2">
            <div class="w-48 font-bold" >ឯកសារ Excel <span class="text-red-600" >*</span></div>
            <input type="file" class="hidden" id="salaryAdjustmentExcel" accept=".xlsx,.xls,.csv" @change="handleExcelFile" />
            <n-button type="info" :disabled="importing || parsing" :loading="parsing" @click="pickFile()" >
              ជ្រើសរើសឯកសារ
            </n-button>
            <div v-if="fileName != ''" class="ml-3 text-gray-600 truncate" >{{ fileName }}</div>
            <div class="w-full text-gray-500 mt-1 pl-1" >
              គំរូឯកសារអាចទាញយកបានតាមប៊ូតុង «ទាញយកគំរូ Excel» នៅលើទំព័រនេះ។ ទុកទំនេរ = មិនប្តូរ តម្លៃចាស់។
            </div>
          </div>

          <!-- 3. What was read out of the file -->
          <div v-if="parsed.rows.length > 0" class="w-full py-2">
            <div class="w-full flex flex-wrap items-center" >
              <div class="font-bold mr-4" >អានបាន ៖</div>
              <div class="mr-4" >ជួរទិន្នន័យ {{ $toKhmer( parsed.rows.length ) }}</div>
              <div class="mr-4" >ជួរឈរគោលការណ៍ {{ $toKhmer( mappedPolicyCount ) }}</div>
              <div class="mr-4 text-green-700" >ត្រូវនឹងបុគ្គលិក {{ matchedCodeCount == null ? '—' : $toKhmer( matchedCodeCount ) }}</div>
              <div class="mr-4" :class="unknownCodeCount > 0 ? ' text-red-600 ' : ' text-gray-400 ' " >មិនមានក្នុងបញ្ជី {{ unknownCodeCount == null ? '—' : $toKhmer( unknownCodeCount ) }}</div>
              <div class="mr-4" :class="invalidCellCount > 0 ? ' text-red-600 ' : ' text-gray-400 ' " >តម្លៃមិនត្រឹមត្រូវ {{ $toKhmer( invalidCellCount ) }}</div>
              <div class="mr-4 text-blue-700" >ក្រឡានឹងរក្សារទុក {{ $toKhmer( filledCellCount ) }}</div>
              <n-checkbox v-model:checked="showOnlyUnknown" class="ml-auto" >បង្ហាញតែជួរមិនត្រូវគ្នា</n-checkbox>
            </div>

            <!-- Which column of the file feeds what; auto-detected, correctable -->
            <div class="w-full mt-2 p-2 bg-gray-50 rounded border border-gray-200" >
              <div class="font-bold mb-1" >ការកំណត់ជួរឈរ</div>
              <div class="flex flex-wrap" >
                <div v-for="( column , index ) in parsed.columns" :key="index" class="w-64 p-1" >
                  <div class="text-xs text-gray-500 truncate" :title="column.header" >{{ column.header == '' ? '(' + $toKhmer( index + 1 ) + ')' : column.header }}</div>
                  <n-select
                    v-model:value="column.target"
                    size="small"
                    filterable
                    :options="columnOptions"
                    placeholder="មិនប្រើ"
                  />
                </div>
              </div>
            </div>

            <!-- Preview -->
            <div class="w-full mt-2 overflow-x-auto max-h-96" >
              <table class="vcb-table" >
                <thead>
                  <tr>
                    <th class="text-center w-12" >ល.រ</th>
                    <th v-for="( column , index ) in usedColumns" :key="'h' + index" class="text-center" >{{ column.header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="( row , index ) in previewRows" :key="index" :class=" row.matched == false ? ' bg-red-50 ' : '' " >
                    <td class="text-center" >{{ $toKhmer( index + 1 ) }}</td>
                    <td v-for="( column , columnIndex ) in usedColumns" :key="'c' + columnIndex" :class=" cellClass( row , column ) " >
                      {{ cellValue( row , column ) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot v-if="previewRows.length > 0" >
                  <tr class="font-bold bg-gray-50" >
                    <td class="text-center" >សរុប</td>
                    <td v-for="( column , columnIndex ) in usedColumns" :key="'t' + columnIndex" class="text-center" >
                      {{ kindOfTarget( column.target ) == 'policy' ? $toKhmer( columnTotal( column ) ) : '' }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div v-if="previewRows.length <= 0" class="w-full text-center text-gray-400 py-6" >មិនមានជួរត្រូវបង្ហាញឡើយ។</div>
          </div>

          <!-- 4. What the server did -->
          <div v-if="result != null" class="w-full py-2" >
            <div class="w-full p-2 rounded border" :class=" result.ok == true ? ' border-green-300 bg-green-50 ' : ' border-red-300 bg-red-50 ' " >
              <div class="font-bold" >{{ result.message }}</div>
              <div v-if="result.ok == true" class="flex flex-wrap mt-1" >
                <div class="mr-4" >បង្កើតថ្មី {{ $toKhmer( result.summary.created ) }}</div>
                <div class="mr-4" >កែប្រែ {{ $toKhmer( result.summary.updated ) }}</div>
                <div class="mr-4" >ដូចដើម {{ $toKhmer( result.summary.unchanged ) }}</div>
                <div class="mr-4" >គ្មានអ្វីកើតឡើង {{ $toKhmer( result.summary.noop ) }}</div>
                <div class="mr-4" :class=" result.summary.not_found > 0 ? ' text-red-700 ' : ' text-gray-400 ' " >អត្តលេខមិនមាន {{ $toKhmer( result.summary.not_found ) }}</div>
                <div class="mr-4" :class=" result.summary.failed > 0 ? ' text-red-700 ' : ' text-gray-400 ' " >បរាជ័យ {{ $toKhmer( result.summary.failed ) }}</div>
              </div>
              <div v-for="( warning , index ) in resultWarnings" :key="'w' + index" class="mt-1 text-yellow-700" >{{ warning }}</div>
              <div v-for="( code , index ) in result.not_found_codes" :key="'n' + index" class="mt-1 text-red-700" >
                អត្តលេខ {{ code }} មិនមានក្នុងប្រព័ន្ធឡើយ។
              </div>
              <div v-for="( column , index ) in result.unknown_columns" :key="'u' + index" class="mt-1 text-red-700" >
                ជួរឈរ {{ column }} មិនត្រូវបានស្គាល់ឡើយ។
              </div>
              <div v-for="( error , index ) in result.errors" :key="'e' + index" class="mt-1 text-red-700" >
                {{ error.code }} / {{ error.policy }} ៖ {{ error.message }}
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex w-full" >
            <n-button class="ml-auto" :disabled="importing" @click="close()" >បិទ</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<script>
import { computed , reactive , ref , onMounted } from 'vue'
import { useStore } from 'vuex'
import { useMessage , useNotification } from 'naive-ui'
import dateFormat from 'dateformat'
import * as XLSX from 'xlsx'
import { getKhmer } from './../../../plugins/kh/number.js'

/**
 * Column headings arrive either as the policy code ("al_pay"), as the policy
 * title, or as "(al_pay)" appended to a human heading. Case, spaces, the
 * zero-width characters Word likes to insert and the punctuation between words
 * are all ignored, so "Cash advance" and "cash_advanced" land on one key.
 */
function normalizeKey( value ){
  return String( value == undefined || value == null ? '' : value )
    .replace( /[\s\u200B\u200C\uFEFF]+/gu , '' )
    .toLowerCase()
    .replace( /[^0-9a-z\u1780-\u17FF]+/gu , '' )
}

/** Keys (normalized) that identify a column of the file as a staff code / name. */
const CODE_KEYS = [ 'code' , 'អត្តលេខ' , 'idcard' , 'staffcode' , 'employeecode' , 'officercode' ]
const NAME_KEYS = [ 'name' , 'ឈ្មោះ' , 'fullname' , 'nameinkhmer' , 'namekhmer' ]
const EN_NAME_KEYS = [ 'nameen' , 'ឈ្មោះឡាតាំង' , 'nameinenglish' , 'englishname' ]

export default {
  name: "UserSalaryAdjustmentImport" ,
  props: {
    /**
     * The screen's own model, used for its title and its API module name.
     */
    model: {
      type: Object ,
      default: () => ( { name: "usersalaryadjustment" , module: "usersalaryadjustments" , title: "" } )
    },
    show: {
      type: Boolean ,
      default: false
    },
    /**
     * The month the page is showing, "yyyy-mm" -- the default month to import
     * into; the user can pick another one inside the dialog.
     */
    date: {
      type: String ,
      default: ''
    },
    onClose: {
      type: Function
    }
  },
  setup( props ){
    const store = useStore()
    const message = useMessage()
    const notify = useNotification()
    const $toKhmer = getKhmer

    const importing = ref( false )
    const parsing = ref( false )
    const fileName = ref( '' )
    const targetDate = ref( null )
    const result = ref( null )
    const showOnlyUnknown = ref( false )

    const parsed = reactive({
      rows: [] ,        // [ { code , cells , values , invalid , matched } ]
      columns: []       // [ { index , header , kind , target } ]
    })

    /** Policies offered as the target of a file column (same list as the screen). */
    const salaryPolicies = computed( () => {
      const records = store.getters['salarypolicy/getRecords']
      return Array.isArray( records ) ? records : []
    })

    /**
     * Every staff code the screen knows about, so a mistyped code is visible
     * BEFORE anything is written. The endpoint the page itself uses is the
     * source, so the two lists agree.
     */
    const knownCodes = ref( null )
    function loadKnownCodes(){
      const date = props.date != '' ? props.date : dateFormat( new Date() , 'yyyy-mm' )
      store.dispatch( 'officer/list' , {
        search: '' ,
        perPage: 1000 ,
        page: 1 ,
        date: date
      }).then( res => {
        const records = res.data != undefined && Array.isArray( res.data.records ) ? res.data.records : []
        knownCodes.value = new Set( records.map( r => String( r.code ).trim().toUpperCase() ) )
      }).catch( () => {
        // The server is still the judge of which codes exist; without the list
        // the preview simply does not claim anything about them.
        knownCodes.value = null
      })
    }

    const periodLabel = computed( () => targetDate.value == null ? '' : dateFormat( new Date( targetDate.value ) , 'mm-yyyy' ) )

    const columnOptions = computed( () => {
      const options = [
        { label: '— មិនប្រើ —' , value: 'ignore' } ,
        { label: 'អត្តលេខ (code)' , value: 'code' } ,
        { label: 'ឈ្មោះ (name)' , value: 'name' }
      ]
      salaryPolicies.value.forEach( policy => {
        options.push( { label: policy.title + ' (' + policy.code + ')' , value: 'policy:' + policy.id } )
      })
      return options
    })

    /**
     * What a column feeds RIGHT NOW. The mapping select writes `target`, so the
     * preview and the payload are both derived from it -- a correction the user
     * makes in the dialog takes effect immediately.
     */
    function kindOfTarget( target ){
      if( target == 'code' ) return 'code'
      if( target == 'name' ) return 'name'
      if( target == 'name_en' ) return 'name_en'
      if( typeof target === 'string' && target.indexOf( 'policy:' ) === 0 ) return 'policy'
      return null
    }

    function policyIdOf( column ){
      return String( column.target ).split(':')[1]
    }

    /**
     * A raw cell as an amount: null when there is nothing there, {invalid} when
     * it is not a number, {amount} otherwise. Values are read from the file at
     * the moment they are used, so re-mapping a column re-reads the same cells.
     */
    function cellAmount( raw ){
      if( raw == undefined || raw == null || String( raw ).trim() == '' ) return null
      const amount = typeof raw === 'number' ? raw : Number( String( raw ).replace( /[,\s]/g , '' ) )
      return isNaN( amount ) ? { invalid: String( raw ) } : { amount: amount }
    }

    /** The columns that will be written, according to the current mapping. */
    const policyColumns = computed( () => parsed.columns.filter( column => kindOfTarget( column.target ) == 'policy' ) )

    /** The columns the preview renders: staff code, names and mapped policies. */
    const usedColumns = computed( () => parsed.columns.filter( column => kindOfTarget( column.target ) != null ) )

    const mappedPolicyCount = computed( () => policyColumns.value.length )

    const filledCellCount = computed( () => parsed.rows.reduce( ( total , row ) =>
      total + policyColumns.value.filter( column => {
        const cell = cellAmount( row.cells[ column.index ] )
        return cell != null && cell.amount != undefined
      }).length , 0 ) )

    const invalidCellCount = computed( () => parsed.rows.reduce( ( total , row ) =>
      total + policyColumns.value.filter( column => {
        const cell = cellAmount( row.cells[ column.index ] )
        return cell != null && cell.invalid != undefined
      }).length , 0 ) )

    const rowHasInvalidCell = ( row ) => policyColumns.value.some( column => {
      const cell = cellAmount( row.cells[ column.index ] )
      return cell != null && cell.invalid != undefined
    } )

    const matchedCodeCount = computed( () => knownCodes.value == null ? null : parsed.rows.filter( row => row.matched === true ).length )
    const unknownCodeCount = computed( () => knownCodes.value == null ? null : parsed.rows.filter( row => row.matched === false ).length )

    const previewRows = computed( () => showOnlyUnknown.value
      ? parsed.rows.filter( row => row.matched == false || rowHasInvalidCell( row ) )
      : parsed.rows
    )

    const canImport = computed( () => targetDate.value != null
      && parsed.rows.length > 0
      && filledCellCount.value > 0
      && importing.value == false
    )

    const resultWarnings = computed( () => result.value != null && Array.isArray( result.value.warnings ) ? result.value.warnings : [] )

    function initial(){
      /**
       * `props.date` is the "yyyy-mm" the page is showing; the picker wants ms.
       */
      const base = props.date != '' ? new Date( props.date + '-01T00:00:00' ) : new Date()
      targetDate.value = isNaN( base.getTime() ) ? new Date().getTime() : base.getTime()
      fileName.value = ''
      result.value = null
      showOnlyUnknown.value = false
      parsed.rows = []
      parsed.columns = []
      const input = document.getElementById( 'salaryAdjustmentExcel' )
      if( input != null ) input.value = ''
      if( salaryPolicies.value.length <= 0 ){
        store.dispatch( 'salarypolicy/list' , { search: '' , perPage: 200 , page: 1 } ).then( res => {
          store.commit( 'salarypolicy/setRecords' , res.data.records )
        }).catch( err => { console.log( err ) } )
      }
      if( knownCodes.value == null ) loadKnownCodes()
    }

    function pickFile(){
      const input = document.getElementById( 'salaryAdjustmentExcel' )
      if( input != null ) input.click()
    }

    function maskOrEscClick(){
      close()
    }

    function close(){
      props.onClose( wroteSomething.value ? 1 : 0 )
    }

    const wroteSomething = computed( () => result.value != null && result.value.ok == true
      && ( result.value.summary.created + result.value.summary.updated ) > 0 )

    /**
     * Read the first worksheet, find the header row and work out which column
     * carries what. A file produced by "ទាញយកគំរូ Excel" is recognised at once;
     * so is a hand-made sheet whose headings are the policy codes or titles.
     */
    function handleExcelFile( event ){
      const files = event.target.files
      if( files == null || files.length <= 0 ) return
      fileName.value = files[0].name
      result.value = null
      parsed.rows = []
      parsed.columns = []
      parsing.value = true

      const reader = new FileReader()
      reader.onload = ( loadEvent ) => {
        try{
          const workbook = XLSX.read( new Uint8Array( loadEvent.target.result ) , { type: 'array' , cellDates: true } )
          const sheet = workbook.Sheets[ workbook.SheetNames[0] ]
          const matrix = XLSX.utils.sheet_to_json( sheet , { header: 1 , raw: true , defval: null , blankrows: false } )
          readMatrix( matrix )
          if( parsed.rows.length <= 0 ){
            notify.warning({
              title: 'អានឯកសារ' ,
              content: 'រកមិនឃើញជួរទិន្នន័យក្នុងឯកសារនេះឡើយ។' ,
              duration: 3000
            })
          }
        }catch( err ){
          console.log( err )
          notify.error({
            title: 'អានឯកសារ' ,
            content: 'មិនអាចអានឯកសារនេះបានឡើយ។ សូមពិនិត្យថាជាឯកសារ Excel (.xlsx)។' ,
            duration: 3000
          })
        }finally{
          parsing.value = false
        }
      }
      reader.onerror = () => {
        parsing.value = false
        notify.error({ title: 'អានឯកសារ' , content: 'មានបញ្ហាពេលអានឯកសារ។' , duration: 3000 })
      }
      reader.readAsArrayBuffer( files[0] )
    }

    /**
     * What a heading can mean. A heading is the whole cell and, when it carries
     * one, the token in brackets: "អត្តលេខ (code)" and "ប្រាក់ទឹកភ្លើង (utility)" both
     * name their column through the bracket.
     */
    function headingKeys( cell ){
      const header = String( cell == undefined || cell == null ? '' : cell ).trim()
      const keys = [ normalizeKey( header ) ]
      const bracket = header.match( /\(([^()]+)\)\s*$/ )
      if( bracket != null ) keys.push( normalizeKey( bracket[1] ) )
      return { header: header , keys: keys }
    }

    /** Locate the header row: the first row that names a staff code column. */
    function readMatrix( matrix ){
      const policyByKey = {}
      salaryPolicies.value.forEach( policy => {
        policyByKey[ normalizeKey( policy.code ) ] = policy
        policyByKey[ normalizeKey( policy.title ) ] = policy
      })

      /** Which of the known meanings a set of heading keys carries, if any. */
      const kindOf = ( keys ) => {
        for( const key of keys ){
          if( key == '' ) continue
          if( CODE_KEYS.includes( key ) ) return { kind: 'code' , target: 'code' }
          if( NAME_KEYS.includes( key ) ) return { kind: 'name' , target: 'name' }
          if( EN_NAME_KEYS.includes( key ) ) return { kind: 'name_en' , target: 'name_en' }
          if( policyByKey[ key ] != undefined ) return { kind: 'policy' , target: 'policy:' + policyByKey[ key ].id }
        }
        return { kind: null , target: 'ignore' }
      }

      let headerIndex = -1
      let codeColumnIndex = -1
      for( let index = 0 ; index < Math.min( 20 , matrix.length ) ; index++ ){
        const row = Array.isArray( matrix[index] ) ? matrix[index] : []
        const found = row.findIndex( cell => kindOf( headingKeys( cell ).keys ).kind == 'code' )
        if( found >= 0 ){
          headerIndex = index
          codeColumnIndex = found
          break
        }
      }
      if( headerIndex < 0 ) return

      const headerRow = matrix[ headerIndex ]
      const columns = []
      headerRow.forEach( ( cell , index ) => {
        const heading = headingKeys( cell )
        /**
         * Only the target is kept: it is the one place a column's meaning lives,
         * so the dialog's mapping select and the payload can never disagree.
         */
        columns.push({ index: index , header: heading.header , target: kindOf( heading.keys ).target })
      })

      parsed.columns = columns

      const rows = []
      for( let index = headerIndex + 1 ; index < matrix.length ; index++ ){
        const row = Array.isArray( matrix[index] ) ? matrix[index] : []
        const code = String( row[ codeColumnIndex ] == undefined || row[ codeColumnIndex ] == null ? '' : row[ codeColumnIndex ] ).trim()
        /** A totals line is not a member of staff. */
        if( code == '' || /^(total|សរុប)/iu.test( code ) ) continue

        rows.push({
          code: code ,
          /** the raw row: the preview and the payload both read the cells */
          cells: row ,
          matched: knownCodes.value == null ? null : knownCodes.value.has( code.toUpperCase() )
        })
      }
      parsed.rows = rows
    }

    const cellValue = ( row , column ) => {
      const raw = row.cells == undefined ? undefined : row.cells[ column.index ]
      const kind = kindOfTarget( column.target )
      if( kind == 'code' ) return raw == undefined || raw == null ? row.code : raw
      if( kind == 'name' || kind == 'name_en' ) return raw == undefined || raw == null ? '' : raw
      const cell = cellAmount( raw )
      if( cell == null ) return ''
      if( cell.invalid != undefined ) return '⚠ ' + cell.invalid
      return $toKhmer( Math.round( cell.amount * 100 ) / 100 )
    }

    const cellClass = ( row , column ) => {
      const kind = kindOfTarget( column.target )
      if( kind == 'code' ) return row.matched == false ? ' text-red-700 font-bold text-center ' : ' text-center '
      if( kind == 'policy' ){
        const cell = cellAmount( row.cells[ column.index ] )
        if( cell != null && cell.invalid != undefined ) return ' text-red-700 text-center '
      }
      return ' text-center '
    }

    const columnTotal = ( column ) => kindOfTarget( column.target ) == 'policy'
      ? parsed.rows.reduce( ( total , row ) => {
          const cell = cellAmount( row.cells[ column.index ] )
          return total + ( cell != null && cell.amount != undefined ? cell.amount : 0 )
        } , 0 )
      : ''

    function submit(){
      if( canImport.value == false ){
        notify.warning({ title: 'នាំចូល' , content: 'សូមជ្រើសរើសខែ និងឯកសារជាមុនសិន។' , duration: 2500 })
        return
      }
      const payload = {
        date: dateFormat( new Date( targetDate.value ) , 'yyyy-mm' ) ,
        rows: parsed.rows.map( row => {
          const values = {}
          policyColumns.value.forEach( column => {
            const policy = salaryPolicies.value.find( p => String( p.id ) == policyIdOf( column ) )
            if( policy == undefined ) return
            const cell = cellAmount( row.cells[ column.index ] )
            if( cell == null || cell.amount == undefined ) return
            values[ policy.code ] = cell.amount
          })
          return { code: row.code , values: values }
        /**
         * Rows whose cells are all empty carry nothing to write; leaving them
         * out keeps the server's report about what actually changed.
         */
        }).filter( row => Object.keys( row.values ).length > 0 )
      }
      importing.value = true
      result.value = null
      store.dispatch( 'usersalaryadjustment/import' , payload ).then( res => {
        importing.value = false
        result.value = res.data
        if( res.data.ok == true ){
          const created = res.data.summary.created
          const updated = res.data.summary.updated
          if( created + updated > 0 ){
            message.success( 'នាំចូលបានសម្រេច ៖ ' + $toKhmer( created ) + ' បង្កើតថ្មី / ' + $toKhmer( updated ) + ' កែប្រែ' )
          }else{
            message.info( 'គ្មានតម្លៃត្រូវប្តូរឡើយ (ទិន្នន័យដូចដើម)។' )
          }
        }else{
          message.error( res.data.message != undefined ? res.data.message : 'នាំចូលមិនបានសម្រេច។' )
        }
      }).catch( err => {
        importing.value = false
        const body = err.response != undefined ? err.response.data : null
        result.value = body != undefined && body.summary != undefined ? body : null
        message.error( body != null && body.message != undefined ? body.message : 'នាំចូលមិនបានសម្រេច។' )
        console.log( err )
      })
    }

    onMounted( () => {
      if( salaryPolicies.value.length <= 0 ){
        store.dispatch( 'salarypolicy/list' , { search: '' , perPage: 200 , page: 1 } ).then( res => {
          store.commit( 'salarypolicy/setRecords' , res.data.records )
        }).catch( err => { console.log( err ) } )
      }
    })

    return {
      /**
       * State
       */
      importing ,
      parsing ,
      fileName ,
      targetDate ,
      result ,
      parsed ,
      showOnlyUnknown ,
      periodLabel ,
      /**
       * Derived
       */
      columnOptions ,
      usedColumns ,
      salaryPolicies ,
      mappedPolicyCount ,
      policyColumns ,
      filledCellCount ,
      invalidCellCount ,
      matchedCodeCount ,
      unknownCodeCount ,
      previewRows ,
      canImport ,
      resultWarnings ,
      /**
       * Actions
       */
      initial ,
      pickFile ,
      handleExcelFile ,
      submit ,
      close ,
      maskOrEscClick ,
      cellValue ,
      cellClass ,
      columnTotal ,
      kindOfTarget ,
      $toKhmer
    }
  }
}
</script>
<style type="text/css" scoped >
.vcb-table {
  @apply p-2 w-full ;
}
.vcb-table tr th {
  @apply px-2 py-2 border-b border-gray-200 relative text-nowrap bg-gray-100 ;
}
.vcb-table tr td {
  @apply px-2 py-1 border-b border-gray-200 relative text-nowrap ;
}
</style>
