use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nvalidator {
    use super::*;

    pub fn init(ctx: Context<AccountContext>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_images = 0;
        Ok(())
    }

    pub fn update(ctx: Context<UpdateContext>) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        base_account.total_images += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AccountContext<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateContext<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub total_images: u64,
}
