import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import ContentPlaceholder from '@/components/ContentPlaceholder'
import Permission from './Permission'

import Layout from '@/layouts/Layout'
import Dashboard from '@/pages/Dashboard'
import FormBasic from '@/pages/Form/FormBasic'
import FormStep from '@/pages/Form/FormStep'
// import TableQuery from '@/pages/Table/Query'
import QueryCreate from '@/pages/Table/Query/QueryCreate'
import TableBasic from '@/pages/Table/TableBasic'
import RichtextQuill from '@/pages/Richtext/Quill'
import Braft from '@/pages/Richtext/Braft'
import RichtextTinyMce from '@/pages/Richtext/TinyMce'
import RichtextDraftWysiwyg from '@/pages/Richtext/DraftWysiwyg'
import RichtextCkeditor from '@/pages/Richtext/Ckeditor'
import CommonCopy from '@/pages/Common/Copy'
import CommonQrcode from '@/pages/Common/Qrcode'
import CommonDownload from '@/pages/Common/Download'
import Account from '@/pages/Account'
import Role from '@/pages/Role'
import Test from '@/pages/Test'
import Admin from '@/pages/Admin'
import Dev from '@/pages/Dev'
import Exception403 from '@/pages/Exception/Exception403'
import Exception404 from '@/pages/Exception/Exception404'
const TableQuery = Loadable({
  loader: () => import(/* webpackChunkName: "table-query" */'@/pages/Table/Query'),
  loading: ContentPlaceholder
})
// const routersMap = {
//   'dashboard': Dashboard,
//   'form_basic': FormBasic,
//   'form_step': FormStep,
//   'table_basic': TableBasic,
//   'table_query': TableQuery,
//   'query_create': QueryCreate,
//   'richtext_quill': RichtextQuill,
//   'richtext_tinymce': RichtextTinyMce,
//   'richtext_draft_wysiwyg': RichtextDraftWysiwyg,
//   'richtext_ckeditor': RichtextCkeditor,
//   'common_copy': CommonCopy,
//   'common_qrcode': CommonQrcode,
//   'common_download': CommonDownload,
//   'role': Role,
//   'account': Account,
//   'admin': Admin,
//   'test': Test,
//   'dev': Dev
// }

export default (props) => {
  return (
    <Layout {...props}>
      <Switch>
        <Route exact path="/" render={() => (
            <Redirect to="/dashboard"/>
          )}
        />
        <Permission exact path="/dashboard" component={Dashboard} />
        <Permission exact path="/form/basic" component={FormBasic} />
        <Permission exact path="/form/step" component={FormStep} />
        <Permission exact path="/table/query" component={TableQuery} />
        <Permission exact path="/table/basic" component={TableBasic} />
        <Permission exact path="/query/create" component={QueryCreate} />
        <Permission exact path="/richtext/quill" component={RichtextQuill} />
        <Permission exact path="/richtext/braft" component={Braft} />
        <Permission exact path="/richtext/tinymce" component={RichtextTinyMce} />
        <Permission exact path="/richtext/draft-wysiwyg" component={RichtextDraftWysiwyg} />
        <Permission exact path="/richtext/ckeditor" component={RichtextCkeditor} />
        <Permission exact path="/common/copy" component={CommonCopy} />
        <Permission exact path="/common/qrcode" component={CommonQrcode} />
        <Permission exact path="/common/download" component={CommonDownload} />
        <Permission exact path="/account" component={Account} />
        <Permission exact path="/role" component={Role} />
        <Permission exact path="/test" component={Test} />
        <Permission exact path="/admin" component={Admin} />
        <Permission exact path="/dev" component={Dev} />
        <Route exact path="/exception403" component={Exception403} />
        <Route exact path="/exception404" component={Exception404} />
        <Route component={Exception404} />
      </Switch>
    </Layout>
  )
}