import { Router } from 'express';

import ensureAuthenticated from '../../../../User/infra/http/middlewares/ensureAuthenticated';
import ExpensesController from '../controllers/ExpensesController';

const expensesRouter = Router();
const expensesController = new ExpensesController();

expensesRouter.use(ensureAuthenticated);

expensesRouter.post('/', expensesController.create);
expensesRouter.post('/list', expensesController.show);

export default expensesRouter;
