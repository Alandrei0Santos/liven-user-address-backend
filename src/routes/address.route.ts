import { Router } from "express";
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, createAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get a list of addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter addresses by country
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Update an existing address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "456 Elm St"
 *               city:
 *                 type: string
 *                 example: "San Francisco"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: Address not found
 */
router.put("/:id", authMiddleware, updateAddress);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The address ID
 *     responses:
 *       204:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
router.delete("/:id", authMiddleware, deleteAddress);

export default router;
