import { ROUTE_ADMIN_BUNDLES } from "../../../constants/rest";

import { 
  MESSAGE_SUCCESS_BUNDLES,
  MESSAGE_SUCCESS_BUNDLES_CREATE,
  MESSAGE_SUCCESS_BUNDLES_UPDATE, 
  MESSAGE_SUCCESS_BUNDLES_DELETE
} from "../../../constants/messages";

const bundles = ({ router, BundleModel }) => {
  router.get(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    BundleModel.find({})
      .then((bundles) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES, data: { bundles } });
      })
      .catch(next);
  });
  
  router.post(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    const { newBundle } = req.body;

    BundleModel.create(newBundle)
      .then((bundle) => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_CREATE, data: { bundle } });
      })
      .catch(next);
  });
  
  router.put(ROUTE_ADMIN_BUNDLES, (req, res, next) => {
    const { newBundle } = req.body;

    const { _id } = newBundle;

    BundleModel.findByIdAndUpdate(_id, newBundle)
      .then(() => res.json({ message: MESSAGE_SUCCESS_BUNDLES_UPDATE }))
      .catch(next);
  });

  router.delete(`${ROUTE_ADMIN_BUNDLES}/:_id`, (req, res, next) => {
    const { _id } = req.params;

    BundleModel.findByIdAndRemove(_id)
      .then(() => res.json({ message: MESSAGE_SUCCESS_BUNDLES_DELETE }))
      .catch(next);
  });

  // https://docs.mongodb.com/manual/reference/operator/update/addToSet/
  // ! Currently overwrites the values of ids
  router.post(`${ROUTE_ADMIN_BUNDLES}/import`, (req, res, next) => {
    const { bundles } = req.body;

    let operations = [];

    for(let id in bundles) {
      const value = bundles[id];
      operations.push({
        updateOne: {
          filter: { id },
          update: { id, value },
          upsert: true
        }
      });
    }

    BundleModel.bulkWrite(operations)
      .then(() => {
        res.json({ message: MESSAGE_SUCCESS_BUNDLES_UPDATE });
      })
      .catch(next);
  });
};

export default bundles;