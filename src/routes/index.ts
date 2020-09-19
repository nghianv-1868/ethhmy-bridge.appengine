import { asyncHandler, createError } from './helpers';
import { IServices } from '../services/init';

export const routes = (app, services: IServices) => {
  // create new BUSD transfer operation
  app.post(
    '/operations',
    asyncHandler(async (req, res) => {
      const operation = await services.operations.create(req.body);

      return res.json(operation);
    })
  );

  // get BUSD operation info by ID
  app.get(
    '/operations/:id',
    asyncHandler(async (req, res) => {
      const data = await services.operations.getOperationById(req.params.id);

      if (!data) {
        throw createError(400, 'Operation not found');
      }

      return res.json(data);
    })
  );

  // action confirm
  app.post(
    '/operations/:operationId/actions/:actionType/confirm',
    asyncHandler(async (req, res) => {
      const data = await services.operations.setActionHash({
        operationId: req.params.operationId,
        actionType: req.params.actionType,
        transactionHash: req.body.transactionHash,
      });

      return res.json(data);
    })
  );

  // get all BUSD operations filtered by one|eth address
  app.get(
    '/operations',
    asyncHandler(async (req, res) => {
      const { ethAddress, oneAddress } = req.query;

      const data = await services.operations.getAllOperations({ ethAddress, oneAddress });

      return res.json(data);
    })
  );

  // mint tokens
  app.post(
    '/get-token',
    asyncHandler(async (req, res) => {
      const data = await services.mintTokens.mint({
        amount: 100,
        address: req.body.address,
        token: req.body.token,
      });

      return res.json(data);
    })
  );
};
